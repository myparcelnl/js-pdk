import {getCurrentScope, onScopeDispose, reactive, ref, watch, type Ref} from 'vue';
import {type FormInstance, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type CarrierModel, TriState} from '@myparcel-dev/pdk-common';
import {triStateValueIsEnabled, useFormCapabilities} from '../helpers';
import {setFieldRef} from '../form-builder/utils/createValueSetter';
import {useQueryStore} from '../../stores';
import {globalLogger} from '../../services';
import {type CapabilitiesSelection} from './wireProxyCapabilities';
import {readShipmentSnapshot} from './readShipmentSnapshot';
import {fieldFactoryRegistry} from './fieldFactoryRegistry';
import {FIELD_CARRIER, optionFieldName} from './field';

/**
 * The single point of reference for shipment-option field state: every rule deciding an
 * option's availability, lock state or forced value lives in {@link resolveOptionStates}.
 *
 *     proxy-capabilities queries ──▶ readShipmentSnapshot (pending / invalid / matched)
 *     form option values ──────────┐
 *     inherited defaults ──────────┤──▶ resolveOptionStates() [PURE — every rule lives here]
 *     carrier capability options ──┘         │
 *                                            ▼
 *                            Map<optionKey, OptionState>
 *                       {supported, readOnly, forcedOn, forcedOff}
 *                          │                             │
 *              field hooks read flags          one watcher writes the forced
 *              (visibleWhen/disabledWhen/       values into the fields
 *               readOnlyWhen = one lookup)
 */

export type OptionState = {
  /** The current capability data contains this option at all; drives visibility. */
  supported: boolean;
  /** The field is locked because the option is forced on or off. */
  readOnly: boolean;
  /** Forced on: carrier-required, or required by another enabled option. */
  forcedOn: boolean;
  /** Forced off: excluded by another enabled option. */
  forcedOff: boolean;
};

export type OptionStateEntry = {
  key: string;
  /** Raw tri-state form value. */
  value: TriState | undefined;
  /** Inherited default shown for `Inherit` (maintained by updateFieldsDefaults). */
  defaultValue: TriState | undefined;
};

export type ResolveOptionStatesInput = {
  /**
   * Options from the regular fallback chain (shipment query → order query → dynamic context).
   * Decides which options exist for the current carrier — i.e. `supported`.
   */
  availabilityOptions: CarrierModel['options'] | undefined;
  /**
   * The chosen carrier's options from a *matched* shipment-scoped capabilities response — the
   * only source of `isRequired` / `requires` / `excludes`. Undefined while loading or invalid.
   */
  shipmentOptions: CarrierModel['options'] | undefined;
  entries: OptionStateEntry[];
};

/* ---------------------------------------------------------------------------------------------
 * Pure resolver — every option-state rule lives here.
 * ------------------------------------------------------------------------------------------- */

/**
 * Compute the complete state of every shipment option. Pure — all inputs in, one map out. The
 * forcing rules mirror the server-side CapabilitiesOptionCalculator.
 *
 * @param input - See {@link ResolveOptionStatesInput}; one `entries` item per option field.
 */
export const resolveOptionStates = (input: ResolveOptionStatesInput): Map<string, OptionState> => {
  const {availabilityOptions, shipmentOptions, entries} = input;

  let forcedOn = new Set<string>();
  let forcedOff = new Set<string>();

  if (shipmentOptions) {
    // Options that are on: explicitly, or through their inherited default.
    // @TODO: non-toggle options (insurance, an int amount) are never treated as enabled here,
    //        so their requires/excludes are not applied yet (the DO widget defers the same case).
    const enabledKeys = entries
      .filter((entry) => triStateValueIsEnabled(entry.value, entry.defaultValue))
      .map((entry) => entry.key);

    ({forcedOn, forcedOff} = resolveForcedStates(shipmentOptions, enabledKeys));
  }

  const states = new Map<string, OptionState>();

  for (const entry of entries) {
    const isForcedOn = forcedOn.has(entry.key);
    const isForcedOff = forcedOff.has(entry.key);

    states.set(entry.key, {
      supported: Object.hasOwn(availabilityOptions ?? {}, entry.key),
      readOnly: isForcedOn || isForcedOff,
      forcedOn: isForcedOn,
      forcedOff: isForcedOff,
    });
  }

  return states;
};

/**
 * Apply the requires and excludes rules of the enabled options. If two rules disagree, the first
 * rule has effect. The resolver writes a warning about the other rule.
 *
 * @param shipmentOptions - The option map from the matched shipment-scoped response.
 * @param enabledKeys - Capability option keys of the options that are currently on.
 */
const resolveForcedStates = (
  shipmentOptions: NonNullable<CarrierModel['options']>,
  enabledKeys: string[],
): {forcedOn: Set<string>; forcedOff: Set<string>} => {
  const requiredKeys = Object.keys(shipmentOptions).filter((key) => shipmentOptions[key]?.isRequired === true);

  // The carrier requires these options. These options are on and locked.
  const forcedOn = new Set(requiredKeys);
  const forcedOff = new Set<string>();

  // The rules come from two groups of options: the group that the carrier requires, and the group
  // that is enabled on the order. An option can be in both groups, and thus the set removes the
  // duplicates. An enabled option is a source of rules only. It does not force its own value, and
  // the user keeps control of that value.
  const ruleSources = new Set([...requiredKeys, ...enabledKeys]);

  // The queue holds the options that the loop must still read. The visited set prevents an endless
  // loop if two options require each other.
  const queue = [...ruleSources];
  const visited = new Set(ruleSources);

  // A for-of loop over an array also reads the items that the loop adds. The queue thus becomes
  // longer while the loop finds more requires rules.
  for (const key of queue) {
    for (const required of shipmentOptions[key]?.requires ?? []) {
      if (forcedOff.has(required)) {
        logRuleConflict(required, key, 'require', 'excluded');

        continue;
      }

      forcedOn.add(required);

      if (!visited.has(required)) {
        // Add the option to the end of the queue. The rules of the enabled options apply first.
        // The rules of an option from a requires chain apply after them.
        visited.add(required);
        queue.push(required);
      }
    }

    for (const excluded of shipmentOptions[key]?.excludes ?? []) {
      if (forcedOn.has(excluded)) {
        logRuleConflict(excluded, key, 'exclude', 'required');

        continue;
      }

      forcedOff.add(excluded);
    }
  }

  return {forcedOn, forcedOff};
};

/**
 * Write a warning about a rule that the resolver does not apply. The capabilities data has a
 * conflict. Correct the data at the source.
 *
 * @param optionKey - Option the rule points at.
 * @param sourceKey - Option that holds the rule.
 * @param action - `require` or `exclude`.
 * @param state - `required` or `excluded`.
 */
const logRuleConflict = (optionKey: string, sourceKey: string, action: string, state: string): void => {
  globalLogger.warn(
    'useShipmentOptionsState',
    `Can't ${action} "${optionKey}", it's already ${state} by another option; capabilities rules contradict each other.`,
    {option: optionKey, source: sourceKey, action, state},
  );
};

/* ---------------------------------------------------------------------------------------------
 * Form wiring — feeds the resolver reactively and exposes the resolved states.
 * ------------------------------------------------------------------------------------------- */

/**
 * Identifies the per-order shipment capabilities query: the order id it is registered under
 * in the query store, and the (debounced) selection it was last fetched for.
 */
type ShipmentQueryContext = {
  orderId: string;
  selection: Readonly<Ref<CapabilitiesSelection>>;
};

// Registry the field hooks read through getOptionState — they run outside Vue setup context
// (no inject), with only the form available.
// A reactive Map keyed by form name, it MUST be reactive to allow Vue to respond to new or changed form states.
const formStates = reactive(new Map<string, Map<string, OptionState>>());

/** State for options we know nothing about: visible and editable, nothing locked or forced. */
const NEUTRAL_OPTION_STATE: OptionState = Object.freeze({
  supported: true,
  readOnly: false,
  forcedOn: false,
  forcedOff: false,
});

/**
 * Connect the option-state resolver to a shipment-options form.
 *
 * @param form - The shipment-options form to resolve states for; must contain the option
 *   fields (`deliveryOptions.shipmentOptions.<key>`) and the carrier field.
 * @param allOptionKeys - Every capability option key a field was created for: the union of
 *   option keys across all carriers in the dynamic context, not just the current carrier's.
 * @param shipmentQuery - Where to find the per-order shipment capabilities query: the order's
 *   external identifier (the query-store key) and the debounced selection returned by
 *   `wireProxyCapabilities`. Leave out for bulk forms and orders without an identifier —
 *   options then resolve availability only and are never locked or forced (requires/excludes
 *   rule data only exists on the shipment-scoped response).
 *
 * @TODO: fold useCapabilitiesAutoClear's option-reset (clearing active options the carrier no
 *        longer supports) in as well, so option-state truly has a single module.
 */
export const useShipmentOptionsState = (
  form: FormInstance,
  allOptionKeys: string[],
  shipmentQuery?: ShipmentQueryContext,
): void => {
  const queryStore = useQueryStore();
  const capabilities = useFormCapabilities();

  const states = ref(new Map<string, OptionState>());

  formStates.set(form.name, states.value);

  // Drop the entry when the form's scope disposes (e.g. modal close), like wireProxyCapabilities
  // does for its queries. Only when the registry still holds OUR states: a reopened modal may
  // have re-registered under the same form name before the old scope is disposed. Guarded
  // because unit tests may call this outside a scope.
  if (getCurrentScope()) {
    onScopeDispose(() => {
      if (formStates.get(form.name) === states.value) {
        formStates.delete(form.name);
      }
    });
  }

  watch(
    () => ({
      snapshot: shipmentQuery
        ? readShipmentSnapshot(shipmentQuery.selection, queryStore, shipmentQuery.orderId)
        : undefined,
      // The shipment response only applies while the form still shows the carrier it was
      // fetched for; right after a carrier switch the (debounced) query still holds the old
      // carrier's data — the old carrier's locks are dropped immediately.
      selectionMatchesForm:
        Boolean(shipmentQuery) && form.getValue(FIELD_CARRIER) === shipmentQuery?.selection.value.carrier,
      availabilityOptions: capabilities.getCarrierCapabilitiesForShipment(form)?.options,
      entries: readEntries(form, allOptionKeys),
    }),
    ({snapshot, selectionMatchesForm, availabilityOptions, entries}) => {
      // A reload for the same carrier (e.g. after a weight change): keep the current locks —
      // recomputing without rule data would briefly unlock every forced option.
      if (snapshot?.state === 'pending' && selectionMatchesForm && states.value.size > 0) {
        return;
      }

      const shipmentOptions =
        snapshot?.state === 'matched' && selectionMatchesForm ? snapshot.carrier.options : undefined;

      const next = resolveOptionStates({availabilityOptions, shipmentOptions, entries});

      states.value = next;
      formStates.set(form.name, next);
      applyForcedValues(form, next);
    },
    {immediate: true},
  );
};

/**
 * Read a single option's resolved state; the field hooks (`visibleWhen` / `disabledWhen` /
 * `readOnlyWhen`) are one call to this each.
 *
 * @param form - The shipment-options form the option field belongs to.
 * @param optionKey - The capability option key: the part after the last dot of the field
 *   name (`requiresSignature` for the field `deliveryOptions.shipmentOptions.requiresSignature`).
 */
export const getOptionState = (form: FormInstance, optionKey: string): OptionState => {
  const states = formStates.get(form.name);

  // Forms that never registered (e.g. field-factory unit tests) stay visible and editable.
  return states?.get(optionKey) ?? NEUTRAL_OPTION_STATE;
};

/** Read the current form value and inherited default of every option field. */
const readEntries = (form: FormInstance, allOptionKeys: string[]): OptionStateEntry[] =>
  allOptionKeys.map((key) => {
    const fieldName = optionFieldName(key);
    const field = form.getField(fieldName) as {props?: {defaultValue?: TriState}} | undefined;

    return {
      key,
      value: form.getValue(fieldName) as TriState | undefined,
      defaultValue: field?.props?.defaultValue,
    };
  });

/**
 * Write the forced value (on for forced-on, off for forced-off) into every affected field.
 * Forced fields are locked with readOnly, not disabled, so their values still submit and
 * end up stored on the order.
 *
 * A required option that has a custom field factory keeps its value. The user must set that value.
 */
const applyForcedValues = (form: FormInstance, states: Map<string, OptionState>): void => {
  for (const [key, state] of states) {
    if (!state.forcedOn && !state.forcedOff) continue;

    // A custom field holds a range of values instead of a toggle. A rule that requires the option
    // does not give one value. The user must set the amount, and export applies the rule again.
    if (state.forcedOn && Object.hasOwn(fieldFactoryRegistry, key)) continue;

    const forcedValue = state.forcedOn ? TriState.On : TriState.Off;
    const fieldName = optionFieldName(key);
    const field = form.getField(fieldName);

    // Skipping fields that already hold the value makes the write-then-recompute cycle stop
    // by itself once every forced value is in place.
    if (!field || form.getValue(fieldName) === forcedValue) continue;

    setFieldRef(field as InteractiveElementInstance, forcedValue);
  }
};
