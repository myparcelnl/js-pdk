import {ref, watch, type Ref} from 'vue';
import {type FormInstance, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type CarrierModel, TriState} from '@myparcel-dev/pdk-common';
import {useFormCapabilities} from '../helpers';
import {setFieldRef} from '../form-builder/utils/createValueSetter';
import {useQueryStore} from '../../stores';
import {type CapabilitiesSelection} from './wireProxyCapabilities';
import {readShipmentSnapshot} from './readShipmentSnapshot';
import {FIELD_CARRIER, FIELD_SHIPMENT_OPTIONS_PREFIX} from './field';

/**
 * THE single point of reference for shipment-option field state. Every rule that decides an
 * option's availability, lock state or forced value lives in {@link resolveOptionStates};
 * everything else only reads the result.
 *
 * Information flow:
 *
 *     proxy-capabilities queries ──▶ readShipmentSnapshot (pending / invalid / matched)
 *     form option values ──────────┐
 *     inherited defaults ──────────┤──▶ resolveOptionStates() [PURE — every rule lives here]
 *     carrier capability options ──┘         │
 *                                            ▼
 *                            Map<optionKey, OptionState>
 *                 {supported, visible, readOnly, forcedOn, forcedOff, targetValue}
 *                          │                             │
 *              field hooks read flags          one watcher writes targetValue
 *              (visibleWhen/disabledWhen/      into the fields (locked with readOnly,
 *               readOnlyWhen = one lookup)      not disabled, so values still submit)
 *
 * Why this shape (not a data-returning composable): the state is read by field hook closures
 * (`visibleWhen` / `readOnlyWhen` / `disabledWhen`) that vue-form-builder invokes outside Vue
 * setup context, with only the form instance available. They cannot receive a composable's
 * return value or call inject(), so the composable registers the state per form (WeakMap) and
 * the hooks look it up through {@link getOptionState}. Same approach, and same reason, as
 * `useFormCapabilities`.
 *
 * @TODO: fold useCapabilitiesAutoClear's option-reset (clearing active options the carrier no
 *        longer supports) into resolveOptionStates as well, so option-state truly has a single
 *        module.
 */

export type OptionState = {
  /** The current capability data contains this option at all. */
  supported: boolean;
  /** The field is rendered (currently equal to `supported`). */
  visible: boolean;
  /** The field is locked: carrier-required, or forced on/off by another enabled option. */
  readOnly: boolean;
  /** Forced on through a requires relation or carrier isRequired. */
  forcedOn: boolean;
  /** Forced off through an excludes relation. */
  forcedOff: boolean;
  /** The value the field must hold; written through by the composable so it persists. */
  targetValue?: TriState;
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
   * Decides which options exist for the current carrier — i.e. `supported` / `visible`.
   */
  availabilityOptions: CarrierModel['options'] | undefined;
  /**
   * The chosen carrier's options from a *matched* shipment-scoped capabilities response —
   * the single source of `isRequired` / `requires` / `excludes`. Not to be confused with the
   * order's `deliveryOptions.shipmentOptions` values; those come in through `entries`.
   * Undefined while loading or invalid: nothing is locked or forced then, because the rule
   * data doesn't exist in any other response.
   */
  shipmentOptions: CarrierModel['options'] | undefined;
  entries: OptionStateEntry[];
};

/** State for options we know nothing about: visible and editable, nothing locked or forced. */
const NEUTRAL_OPTION_STATE: OptionState = Object.freeze({
  supported: true,
  visible: true,
  readOnly: false,
  forcedOn: false,
  forcedOff: false,
});

/**
 * An option counts as enabled when it's explicitly on, or inheriting while its inherited
 * default is on — the same interpretation `triStateFieldIsEnabled` applies elsewhere.
 */
const isEffectivelyEnabled = (entry: OptionStateEntry): boolean =>
  TriState.On === entry.value || (TriState.Inherit === entry.value && TriState.On === entry.defaultValue);

/**
 * Collect every option that must be turned on. Starting from the carrier-required options and
 * the enabled options, follow each option's `requires` list — and the `requires` of those
 * options in turn, until no new options show up (options that were already seen are skipped,
 * so circular requires can't loop forever). Carrier-required options are included in the
 * result themselves; enabled options are not — their own value is the user's choice.
 *
 * @param shipmentOptions - The option map from the matched shipment-scoped capabilities response,
 *   keyed by capability option key (e.g. `requiresSignature`). Each entry may carry
 *   `isRequired`, `requires` and `excludes`.
 * @param enabledKeys - Capability option keys of the options that are currently on in the
 *   form (explicitly, or through their inherited default).
 */
const resolveForcedOn = (shipmentOptions: NonNullable<CarrierModel['options']>, enabledKeys: string[]): Set<string> => {
  const forcedOn = new Set<string>();
  const requiredKeys = Object.keys(shipmentOptions).filter((key) => shipmentOptions[key]?.isRequired === true);

  requiredKeys.forEach((key) => forcedOn.add(key));

  const queue = [...requiredKeys, ...enabledKeys];
  const visited = new Set(queue);

  while (queue.length > 0) {
    const key = queue.shift() as string;

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
 * Collect the `excludes` of every active option into the forced-off set.
 *
 * @param shipmentOptions - The option map from the matched shipment-scoped capabilities response.
 * @param activeKeys - Every option that is on: the enabled options plus the forced-on set
 *   computed by {@link resolveForcedOn}.
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

/**
 * Decide which value a field must be set to, if any. Returns undefined when the field may
 * keep its current value.
 *
 * @param entry - The option's key plus its current form value and inherited default.
 * @param isForcedOn - Whether the option is in the forced-on set.
 * @param isForcedOff - Whether the option is in the forced-off set.
 */
const resolveTargetValue = (
  entry: OptionStateEntry,
  isForcedOn: boolean,
  isForcedOff: boolean,
): TriState | undefined => {
  if (isForcedOn && TriState.On !== entry.value) return TriState.On;

  if (isForcedOff && TriState.Off !== entry.value) return TriState.Off;

  return undefined;
};

/**
 * Compute the complete state of every shipment option. Pure — all inputs in, one map out.
 *
 * Forcing rules, mirroring the server-side CapabilitiesOptionCalculator:
 * - carrier-required options (`isRequired`) are forced on, including everything their
 *   `requires` lists point to, directly or indirectly;
 * - enabled options pull in everything their `requires` lists point to (the option itself
 *   stays free — its own value is the user's choice);
 * - `excludes` of every active option force the excluded options off;
 * - on conflict, forced-off wins (the PHP calculator depends on iteration order here; real
 *   data has no conflicting rules).
 *
 * @param input - See {@link ResolveOptionStatesInput}: the option map used for availability,
 *   the option map used for rules (only from a matched shipment response), and one entry per
 *   option field with its current form value and inherited default.
 */
export const resolveOptionStates = (input: ResolveOptionStatesInput): Map<string, OptionState> => {
  const {availabilityOptions, shipmentOptions, entries} = input;

  let forcedOn = new Set<string>();
  let forcedOff = new Set<string>();

  if (shipmentOptions) {
    const enabledKeys = entries.filter(isEffectivelyEnabled).map((entry) => entry.key);

    forcedOn = resolveForcedOn(shipmentOptions, enabledKeys);
    forcedOff = resolveForcedOff(shipmentOptions, new Set([...enabledKeys, ...forcedOn]));

    for (const key of forcedOff) {
      forcedOn.delete(key);
    }
  }

  const states = new Map<string, OptionState>();

  for (const entry of entries) {
    const supported = Object.hasOwn(availabilityOptions ?? {}, entry.key);
    const isForcedOn = forcedOn.has(entry.key);
    const isForcedOff = forcedOff.has(entry.key);

    states.set(entry.key, {
      supported,
      visible: supported,
      readOnly: isForcedOn || isForcedOff,
      forcedOn: isForcedOn,
      forcedOff: isForcedOff,
      targetValue: resolveTargetValue(entry, isForcedOn, isForcedOff),
    });
  }

  return states;
};

/**
 * Identifies the per-order shipment capabilities query: the order id it is registered under
 * in the query store, and the (debounced) selection it was last fetched for.
 */
type ShipmentQueryContext = {
  orderId: string;
  selection: Readonly<Ref<CapabilitiesSelection>>;
};

const formStates = new WeakMap<FormInstance, Ref<Map<string, OptionState>>>();

const optionFieldName = (key: string): string => `${FIELD_SHIPMENT_OPTIONS_PREFIX}.${key}`;

/**
 * Read a single option's resolved state. Field hooks (`visibleWhen` / `disabledWhen` /
 * `readOnlyWhen`) call this — reading `states.value` inside those reactive re-evaluators
 * makes them re-run whenever the states are recomputed. Forms that never registered with
 * {@link useShipmentOptionsState} (e.g. field-factory unit tests) get a neutral state that
 * leaves the field visible and editable.
 *
 * @param form - The shipment-options form the option field belongs to.
 * @param optionKey - The capability option key: the part after the last dot of the field
 *   name (`requiresSignature` for the field `deliveryOptions.shipmentOptions.requiresSignature`).
 */
export const getOptionState = (form: FormInstance, optionKey: string): OptionState => {
  const states = formStates.get(form);

  if (!states) return NEUTRAL_OPTION_STATE;

  return states.value.get(optionKey) ?? NEUTRAL_OPTION_STATE;
};

/**
 * Connect the option-state resolver to a shipment-options form. States are recomputed when
 * the shipment capabilities response, any option value, an inherited default, or the chosen
 * carrier changes. Forced values are written into the fields; locked fields use readOnly, not
 * disabled, so their values are still submitted and end up stored on the order.
 *
 * Without a shipment query (bulk forms, orders without an identifier) the module still
 * resolves which options are available, but never locks or forces anything — the
 * requires/excludes rule data only exists on the shipment-scoped response.
 *
 * While a reload for the same carrier is in progress, the previous states are kept on purpose:
 * recomputing without rule data would briefly unlock every forced option until the response
 * arrives. After a carrier switch the previous locks are dropped immediately instead, because
 * they belong to the old carrier's rules.
 *
 * @param form - The shipment-options form to resolve states for; must contain the option
 *   fields (`deliveryOptions.shipmentOptions.<key>`) and the carrier field.
 * @param allOptionKeys - Every capability option key a field was created for: the union of
 *   option keys across all carriers in the dynamic context, not just the current carrier's.
 * @param shipmentQuery - Where to find the per-order shipment capabilities query: the order's
 *   external identifier (the query-store key) and the debounced selection returned by
 *   `wireProxyCapabilities`. Leave out for bulk forms and orders without an identifier —
 *   options then resolve availability only and are never locked or forced.
 */
export const useShipmentOptionsState = (
  form: FormInstance,
  allOptionKeys: string[],
  shipmentQuery?: ShipmentQueryContext,
): void => {
  const queryStore = useQueryStore();
  const capabilities = useFormCapabilities();

  const states = ref(new Map<string, OptionState>());

  formStates.set(form, states);

  watch(
    () => ({
      snapshot: shipmentQuery
        ? readShipmentSnapshot(shipmentQuery.selection, queryStore, shipmentQuery.orderId)
        : undefined,
      availabilityOptions: capabilities.getCarrierCapabilitiesForShipment(form)?.options,
      entries: readEntries(form, allOptionKeys),
      carrier: form.getValue(FIELD_CARRIER) as string | undefined,
    }),
    ({snapshot, availabilityOptions, entries, carrier}) => {
      // The response only applies when the form still shows the carrier it was fetched for;
      // right after a carrier switch the (debounced) query still holds the old carrier's data.
      const selectionMatchesForm = Boolean(shipmentQuery) && carrier === shipmentQuery?.selection.value.carrier;

      // A reload for the same carrier (e.g. after a weight change): keep the current locks
      // until the new response arrives, instead of unlocking everything in the meantime.
      if (snapshot?.state === 'pending' && selectionMatchesForm && states.value.size > 0) {
        return;
      }

      const shipmentOptions =
        snapshot?.state === 'matched' && selectionMatchesForm ? snapshot.carrier.options : undefined;

      const next = resolveOptionStates({availabilityOptions, shipmentOptions, entries});

      states.value = next;
      applyTargetValues(form, next);
    },
    {immediate: true},
  );
};

/**
 * Read the current form value and inherited default of every option field.
 *
 * @param form - The shipment-options form holding the option fields.
 * @param allOptionKeys - Every capability option key a field was created for.
 */
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
 * Write every resolved `targetValue` into its field. Fields that already hold the value are
 * skipped — the watcher runs again after each write, and because unchanged values are skipped
 * it stops by itself once every forced value is in place.
 *
 * @param form - The form whose option fields receive the forced values.
 * @param states - The resolved states from {@link resolveOptionStates}, keyed by capability
 *   option key.
 */
const applyTargetValues = (form: FormInstance, states: Map<string, OptionState>): void => {
  for (const [key, state] of states) {
    if (state.targetValue === undefined) continue;

    const fieldName = optionFieldName(key);
    const field = form.getField(fieldName);

    if (!field || form.getValue(fieldName) === state.targetValue) continue;

    setFieldRef(field as InteractiveElementInstance, state.targetValue);
  }
};
