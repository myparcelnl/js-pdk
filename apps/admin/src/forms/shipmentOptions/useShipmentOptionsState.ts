import {reactive, ref, watch, type Ref} from 'vue';
import {type FormInstance, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type CarrierModel, TriState} from '@myparcel-dev/pdk-common';
import {triStateValueIsEnabled, useFormCapabilities} from '../helpers';
import {setFieldRef} from '../form-builder/utils/createValueSetter';
import {useQueryStore} from '../../stores';
import {type CapabilitiesSelection} from './wireProxyCapabilities';
import {readShipmentSnapshot} from './readShipmentSnapshot';
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

    forcedOn = resolveForcedOn(shipmentOptions, enabledKeys);
    forcedOff = resolveForcedOff(shipmentOptions, new Set([...enabledKeys, ...forcedOn]));

    // On conflict, forced-off wins -- normally data should have no conflicting rules.
    for (const key of forcedOff) {
      forcedOn.delete(key);
    }
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
 * Collect every option that must be turned on, following `requires` lists transitively.
 *
 * @param shipmentOptions - The option map from the matched shipment-scoped response.
 * @param enabledKeys - Capability option keys of the options that are currently on.
 */
const resolveForcedOn = (shipmentOptions: NonNullable<CarrierModel['options']>, enabledKeys: string[]): Set<string> => {
  const requiredKeys = Object.keys(shipmentOptions).filter((key) => shipmentOptions[key]?.isRequired === true);

  // Carrier-required options force themselves; enabled options only force what they require —
  // their own value stays the user's choice.
  const forcedOn = new Set(requiredKeys);

  // `visited` skips options that were already walked, so circular requires can't loop forever.
  const queue = [...requiredKeys, ...enabledKeys];
  const visited = new Set(queue);

  // A for-of loop over an array visits items pushed during the loop, so the queue grows as
  // new requires are discovered.
  for (const key of queue) {
    for (const required of shipmentOptions[key]?.requires ?? []) {
      forcedOn.add(required);

      if (!visited.has(required)) {
        visited.add(required);
        queue.push(required);
      }
    }
  }

  return forcedOn;
};

/**
 * Collect the `excludes` of every active option (enabled plus forced-on) into the forced-off set.
 */
const resolveForcedOff = (
  shipmentOptions: NonNullable<CarrierModel['options']>,
  activeKeys: Set<string>,
): Set<string> => {
  const forcedOff = new Set<string>();

  for (const key of activeKeys) {
    for (const excluded of shipmentOptions[key]?.excludes ?? []) {
      forcedOff.add(excluded);
    }
  }

  return forcedOff;
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
 */
const applyForcedValues = (form: FormInstance, states: Map<string, OptionState>): void => {
  for (const [key, state] of states) {
    if (!state.forcedOn && !state.forcedOff) continue;

    const forcedValue = state.forcedOn ? TriState.On : TriState.Off;
    const fieldName = optionFieldName(key);
    const field = form.getField(fieldName);

    // Skipping fields that already hold the value makes the write-then-recompute cycle stop
    // by itself once every forced value is in place.
    if (!field || form.getValue(fieldName) === forcedValue) continue;

    setFieldRef(field as InteractiveElementInstance, forcedValue);
  }
};
