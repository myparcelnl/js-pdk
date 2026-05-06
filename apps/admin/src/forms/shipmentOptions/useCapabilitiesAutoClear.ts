import {toValue, watch, type Ref} from 'vue';
import {type FormInstance, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {BackendEndpoint, type CarrierModel, type Plugin, TriState} from '@myparcel-dev/pdk-common';
import {addCapabilitiesClearNotification, useFormCapabilities} from '../helpers';
import type {CapabilitiesClearEntry} from '../helpers';
import {setFieldRef} from '../form-builder/utils/createValueSetter';
import {useNotificationStore, useQueryStore} from '../../stores';
import {type CapabilitiesSelection} from './wireProxyCapabilities';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_PACKAGE_TYPE, FIELD_SHIPMENT_OPTIONS_PREFIX} from './field';

type InheritedDeliveryOptions = Plugin.ModelContextOrderDataContext['inheritedDeliveryOptions'];

type AxisField = typeof FIELD_CARRIER | typeof FIELD_PACKAGE_TYPE | typeof FIELD_DELIVERY_TYPE;

const FIELD_TO_LABEL: Record<AxisField, string> = {
  [FIELD_CARRIER]: 'carrier',
  [FIELD_PACKAGE_TYPE]: 'package_type',
  [FIELD_DELIVERY_TYPE]: 'delivery_type',
};

const optionFieldName = (key: string): string => `${FIELD_SHIPMENT_OPTIONS_PREFIX}.${key}`;

/**
 * Set a form field's value safely. `vue-form-builder` swaps `field.ref` from a Vue Ref to a
 * primitive after the first render cycle, so `form.setValue(name, value)` (which does
 * `field.ref.value = value`) throws once that swap has happened. `setFieldRef` checks
 * `isRef(field.ref)` and falls back to `field.ref = value` for the post-render shape.
 */
const setFieldValue = (form: FormInstance, fieldName: string, value: string | number | boolean | undefined): void => {
  const field = form.getField(fieldName) as InteractiveElementInstance | undefined;

  if (!field) return;

  setFieldRef(field, value as Parameters<typeof setFieldRef>[1]);
};

type ShipmentResponseSnapshot =
  | {state: 'pending'}
  | {state: 'invalid_combo'}
  | {state: 'matched'; carrier: CarrierModel};

/**
 * Read the shipment query's state directly so the auto-clear can distinguish three cases the
 * helper-level `getCarrierForShipment` collapses for its consumers:
 *
 * - **`pending`**: query not registered, loading, errored, or has no data yet. No clear should
 *   fire — transient state.
 * - **`invalid_combo`**: query is `success` but `results` is empty or doesn't contain the
 *   chosen carrier. The server has confirmed this combination isn't valid; trigger an
 *   axis-rollback.
 * - **`matched`**: query is `success` and the carrier was found. Use the response's narrow
 *   `options` to decide which active option fields are now orphaned.
 *
 * `queryStore` is captured at composable setup time and passed in here — calling
 * `useQueryStore()` inside a watcher tick fires Vue's `inject() can only be used inside
 * setup()` warning AND can return a disconnected store instance, breaking dep tracking on
 * `queries.value[key]`.
 */
const readShipmentSnapshot = (
  selection: Readonly<Ref<CapabilitiesSelection>>,
  queryStore: ReturnType<typeof useQueryStore>,
  orderId: string,
): ShipmentResponseSnapshot => {
  const modifier = `${orderId}.shipment`;

  if (!queryStore.has(BackendEndpoint.ProxyCapabilities, modifier)) return {state: 'pending'};

  const query = queryStore.get(BackendEndpoint.ProxyCapabilities, modifier);

  if (toValue(query.status) !== 'success') return {state: 'pending'};

  const carriers = (toValue(query.data) ?? []) as CarrierModel[];
  // Compare against the carrier from the *debounced* selection — the same selection the
  // shipment query was last fetched for. Reading directly from `form.getValue(carrier)` here
  // would race: when the user just changed an axis, the form value updates immediately while
  // the debounced selection (and thus the query's data) lags by `DEBOUNCE_MS`. During that
  // window we'd compare the new form carrier against the previous-fetch's response, see no
  // match, and falsely declare invalid_combo.
  const queryCarrier = selection.value.carrier;
  const matched = carriers.find((carrier) => carrier.carrier === queryCarrier);

  return matched ? {state: 'matched', carrier: matched} : {state: 'invalid_combo'};
};

/**
 * Watch the form's selection refs and the capability queries, and roll back any field that
 * has become invalid because of another axis changing. Each clear is announced through a
 * single rolling form-level notification (see {@link addCapabilitiesClearNotification}).
 *
 * The core rule (per design): when a user action invalidates the form, the field the user
 * just touched is cleared — they're already at that field in the UI, so they immediately
 * see the rollback and can pick again. We never silently mutate fields the user previously
 * set without notifying them.
 *
 * Three independent invalidation sources are handled, each in its own watcher:
 *
 * 1. **Cross-axis (synchronous) — order data**: when the chosen carrier's `packageTypes` /
 *    `deliveryTypes` (from the order query) no longer contain the form's current value,
 *    we clear that field. The clear targets the user's most-recently-modified axis when
 *    that axis is one of (carrier / packageType / deliveryType); when no axis was just
 *    touched (pre-fill on modal open, or weight slider edits), we default to clearing
 *    deliveryType as the most permissive re-pick.
 * 2. **Shipment-empty — server invalidation**: when the shipment query returns no entry for
 *    the chosen carrier (empty `results` or carrier not present), the server has confirmed
 *    the combination isn't valid. Clears the just-touched axis (or deliveryType by default).
 * 3. **Option key dropped — cross-axis effect on options**: when the shipment query has the
 *    chosen carrier but its `options` no longer carries an option key the form has active,
 *    that option is cleared (`TriState.Inherit`). Axis intent wins over an active option.
 *
 * Form values are read via `form.getValue(name)` rather than `form.values[name]` so reactive
 * dep tracking inside `computed` / `watch` callbacks fires correctly (the PDK's existing
 * `createValueGetter` follows the same pattern).
 */
export const useCapabilitiesAutoClear = (
  form: FormInstance,
  allOptionKeys: string[],
  orderId: string,
  inheritedDeliveryOptions: InheritedDeliveryOptions,
  selection: Readonly<Ref<CapabilitiesSelection>>,
): void => {
  // Capture Pinia stores at setup time so watcher callbacks don't call `useQueryStore()` /
  // `useNotificationStore()` in non-setup contexts (which fires Vue's "inject() can only be
  // used inside setup()" warning AND can yield a disconnected store instance, breaking
  // reactive dep tracking on `queries.value[key]`).
  const queryStore = useQueryStore();
  const notificationStore = useNotificationStore();
  const {getCarrierForOrder} = useFormCapabilities();

  let lastModifiedAxis: AxisField | undefined;
  /**
   * The value the most-recently-modified axis held BEFORE the user's just-rejected change.
   * Used to revert (rather than clear) on invalid-combo, so the user's previous valid choice
   * is restored rather than the field being emptied.
   */
  let lastModifiedPreviousValue: unknown;
  let suppressTracking = false;

  /**
   * Set a field value while suppressing the `lastModifiedAxis` tracker for the duration of
   * the write. Without this guard the next reactive watcher tick would attribute the clear
   * to the user (turning every auto-clear into a self-perpetuating "user just touched X"
   * signal). Pairs with the `suppressTracking` flag the axis-tracking watcher reads.
   */
  const setSilently = (fieldName: string, value: string | number | boolean | undefined): void => {
    suppressTracking = true;
    try {
      setFieldValue(form, fieldName, value);
    } finally {
      suppressTracking = false;
    }
  };

  const previousAxisValues: Record<AxisField, unknown> = {
    [FIELD_CARRIER]: form.getValue(FIELD_CARRIER),
    [FIELD_PACKAGE_TYPE]: form.getValue(FIELD_PACKAGE_TYPE),
    [FIELD_DELIVERY_TYPE]: form.getValue(FIELD_DELIVERY_TYPE),
  };

  watch(
    [
      () => form.getValue(FIELD_CARRIER),
      () => form.getValue(FIELD_PACKAGE_TYPE),
      () => form.getValue(FIELD_DELIVERY_TYPE),
    ],
    ([carrierValue, packageTypeValue, deliveryTypeValue]) => {
      if (suppressTracking) return;

      // Capture both the axis that just changed AND its prior value before we overwrite the
      // snapshot — the prior value is the revert target if the new selection turns out to be
      // an invalid combination.
      if (carrierValue !== previousAxisValues[FIELD_CARRIER]) {
        lastModifiedAxis = FIELD_CARRIER;
        lastModifiedPreviousValue = previousAxisValues[FIELD_CARRIER];
      } else if (packageTypeValue !== previousAxisValues[FIELD_PACKAGE_TYPE]) {
        lastModifiedAxis = FIELD_PACKAGE_TYPE;
        lastModifiedPreviousValue = previousAxisValues[FIELD_PACKAGE_TYPE];
      } else if (deliveryTypeValue !== previousAxisValues[FIELD_DELIVERY_TYPE]) {
        lastModifiedAxis = FIELD_DELIVERY_TYPE;
        lastModifiedPreviousValue = previousAxisValues[FIELD_DELIVERY_TYPE];
      }

      previousAxisValues[FIELD_CARRIER] = carrierValue;
      previousAxisValues[FIELD_PACKAGE_TYPE] = packageTypeValue;
      previousAxisValues[FIELD_DELIVERY_TYPE] = deliveryTypeValue;
    },
  );

  /**
   * Roll back the just-touched axis. If we have a previous valid value to revert to (the user
   * picked something invalid AFTER having a valid choice), restore that — preserves the
   * previous selection so the form doesn't surprise the user with an emptied field. If there's
   * no revert target (axis was never set, or this is the first-ever change on a freshly-opened
   * modal), clear the field instead.
   */
  const revertAxis = (axis: AxisField): {revertedTo: unknown} => {
    const target = lastModifiedAxis === axis ? lastModifiedPreviousValue : undefined;
    const valueToSet = target as string | number | boolean | undefined;

    setSilently(axis, valueToSet);

    return {revertedTo: valueToSet};
  };

  /**
   * Pick a sensible default for `packageType` / `deliveryType` given a carrier, sourced from
   * `inheritedDeliveryOptions[carrier]`. Returns `undefined` when no useful default exists
   * (caller falls back to clearing the field).
   */
  const inheritedDefault = (carrierName: string, axis: typeof FIELD_PACKAGE_TYPE | typeof FIELD_DELIVERY_TYPE) => {
    const defaults = inheritedDeliveryOptions[carrierName];

    if (!defaults) return undefined;

    return axis === FIELD_PACKAGE_TYPE ? defaults.packageType : defaults.deliveryType;
  };

  /**
   * Decide how to react when the current selection turns out to be an invalid combo.
   *
   * - Carrier change: KEEP the user's new carrier (switching carrier is "fresh start" intent).
   *   For `packageType` / `deliveryType`, switch to the inherited default for the new carrier
   *   when one exists, else clear. Silent (no notification) — the UI already shifts
   *   significantly when carrier changes, and an extra notification adds noise.
   * - PackageType / deliveryType change: revert THAT axis to its prior valid value, with a
   *   notification (the user's tweak was invalid; their previous selection was fine).
   * - No recent user action (modal pre-fill, weight slider): default-clear deliveryType, with
   *   a notification.
   *
   * Returns `entries` for the notification builder. An empty array means "carrier change —
   * silent."
   */
  const resolveInvalidCombo = (): CapabilitiesClearEntry[] => {
    if (lastModifiedAxis === FIELD_CARRIER) {
      const carrierName = form.getValue<string | undefined>(FIELD_CARRIER);

      if (carrierName) {
        setSilently(FIELD_PACKAGE_TYPE, inheritedDefault(carrierName, FIELD_PACKAGE_TYPE) as
          | string
          | number
          | boolean
          | undefined);
        setSilently(FIELD_DELIVERY_TYPE, inheritedDefault(carrierName, FIELD_DELIVERY_TYPE) as
          | string
          | number
          | boolean
          | undefined);
      } else {
        setSilently(FIELD_PACKAGE_TYPE, undefined);
        setSilently(FIELD_DELIVERY_TYPE, undefined);
      }

      return [];
    }

    if (lastModifiedAxis === FIELD_PACKAGE_TYPE || lastModifiedAxis === FIELD_DELIVERY_TYPE) {
      revertAxis(lastModifiedAxis);

      return [{field: FIELD_TO_LABEL[lastModifiedAxis], reason: 'invalid_combination'}];
    }

    setSilently(FIELD_DELIVERY_TYPE, undefined);

    return [{field: FIELD_TO_LABEL[FIELD_DELIVERY_TYPE], reason: 'invalid_combination'}];
  };

  /**
   * Pick which axis to roll back when the order or shipment data invalidates the current
   * combination. If the user just touched packageType / deliveryType (or carrier) and that
   * change is the cause, we clear that axis. If we don't have a recent action attributable
   * to the user (e.g. modal pre-fill, weight slider), we default to clearing deliveryType
   * as the most permissive re-pick.
   */
  const pickAxisToClear = (): AxisField => lastModifiedAxis ?? FIELD_DELIVERY_TYPE;

  /**
   * Synchronous cross-axis validation against the order query — runs whenever the carrier
   * dropdown or its underlying data changes. Catches "current packageType isn't even in the
   * carrier's order-level union" without waiting for the shipment query round trip.
   */
  watch(
    () => {
      const carrier = getCarrierForOrder(form);
      const packageType = form.getValue<string | undefined>(FIELD_PACKAGE_TYPE);
      const deliveryType = form.getValue<string | undefined>(FIELD_DELIVERY_TYPE);

      return {
        carrierName: carrier?.carrier,
        packageTypesInCarrier: carrier?.packageTypes ?? [],
        deliveryTypesInCarrier: carrier?.deliveryTypes ?? [],
        packageType,
        deliveryType,
      };
    },
    ({carrierName, packageTypesInCarrier, deliveryTypesInCarrier, packageType, deliveryType}) => {
      if (!carrierName) return;

      const clears: CapabilitiesClearEntry[] = [];
      const reason = `not_available_for_${carrierName}`;

      if (packageType && !packageTypesInCarrier.includes(packageType)) {
        const target = lastModifiedAxis === FIELD_CARRIER ? FIELD_PACKAGE_TYPE : pickAxisToClear();

        revertAxis(target);
        clears.push({field: FIELD_TO_LABEL[target], reason});
      }

      if (deliveryType && !deliveryTypesInCarrier.includes(deliveryType)) {
        const target = lastModifiedAxis === FIELD_CARRIER ? FIELD_DELIVERY_TYPE : pickAxisToClear();

        revertAxis(target);
        clears.push({field: FIELD_TO_LABEL[target], reason});
      }

      if (clears.length > 0) {
        addCapabilitiesClearNotification(notificationStore, clears);
      }
    },
    {deep: true},
  );

  /**
   * Shipment-query watcher — handles both invalid-combo and option-availability cases via the
   * snapshot helper above. Reads the query state directly so we can distinguish "still
   * loading" (do nothing) from "loaded but combo invalid" (axis rollback) and "loaded and
   * matched" (option-availability scan).
   */
  watch(
    () => readShipmentSnapshot(selection, queryStore, orderId),
    (snapshot) => {
      if (snapshot.state === 'pending') return;

      if (snapshot.state === 'invalid_combo') {
        const entries = resolveInvalidCombo();

        if (entries.length > 0) {
          addCapabilitiesClearNotification(notificationStore, entries);
        }

        return;
      }

      const availableOptionKeys = Object.keys(snapshot.carrier.options);
      const carrierName = snapshot.carrier.carrier;
      const clears: CapabilitiesClearEntry[] = [];
      // Carrier switches reshape the form heavily already (different option set, different
      // packageType/deliveryType lists). Notifying on top of that adds noise — silently turn
      // off any orphaned options. Notify only when the change came from a non-carrier axis.
      const silent = lastModifiedAxis === FIELD_CARRIER;

      for (const optionKey of allOptionKeys) {
        const fieldName = optionFieldName(optionKey);
        const value = form.getValue(fieldName);
        const isActive = value !== undefined && value !== TriState.Inherit && Boolean(value);

        if (!isActive) continue;
        if (availableOptionKeys.includes(optionKey)) continue;

        setSilently(fieldName, TriState.Inherit);

        if (!silent) {
          clears.push({field: optionKey, reason: `not_available_for_${carrierName}_combination`});
        }
      }

      if (clears.length > 0) {
        addCapabilitiesClearNotification(notificationStore, clears);
      }
    },
  );
};
