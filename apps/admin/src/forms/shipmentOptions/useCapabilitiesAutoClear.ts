import {watch, type Ref} from 'vue';
import {snakeCase} from 'lodash-unified';
import {type FormInstance, type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {type Plugin, TriState} from '@myparcel-dev/pdk-common';
import {addCapabilitiesClearNotification, CAPABILITIES_CLEARED_NOTIFICATION_ID, useFormCapabilities} from '../helpers';
import {setFieldRef} from '../form-builder/utils/createValueSetter';
import {useNotificationStore, useQueryStore} from '../../stores';
import {useLanguage} from '../../composables';
import {type CapabilitiesSelection} from './wireProxyCapabilities';
import {readShipmentSnapshot} from './readShipmentSnapshot';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_PACKAGE_TYPE, optionFieldName, SHIPMENT_OPTIONS} from './field';

type InheritedDeliveryOptions = Plugin.ModelContextOrderDataContext['inheritedDeliveryOptions'];

type AxisField = typeof FIELD_CARRIER | typeof FIELD_PACKAGE_TYPE | typeof FIELD_DELIVERY_TYPE;

/**
 * Translation key per axis. Carrier uses the form-builder's bare `'carrier'` key (matching
 * `createCarrierField`); packageType / deliveryType use the existing field labels.
 */
const FIELD_TO_LABEL_KEY: Record<AxisField, string> = {
  [FIELD_CARRIER]: 'carrier',
  [FIELD_PACKAGE_TYPE]: snakeCase(`${SHIPMENT_OPTIONS}_package_type`),
  [FIELD_DELIVERY_TYPE]: snakeCase(`${SHIPMENT_OPTIONS}_delivery_type`),
};

/**
 * Translation key for an option's field label (matches `getFieldLabel(name)` from the
 * shipment-option factories).
 */
const optionLabelKey = (key: string): string => snakeCase(`${SHIPMENT_OPTIONS}_${key}`);

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
 *    we clear that field. Carrier-change is special-cased through the same silent +
 *    inherited-defaults flow as the shipment-query path; without that, the order watcher
 *    (which fires synchronously) would emit a noisy notification before the debounced
 *    shipment watcher gets a chance to apply the silent reset.
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
  // Capture Pinia stores + translator at setup time so watcher callbacks don't call
  // `useQueryStore()` / `useNotificationStore()` / `useLanguage()` in non-setup contexts (which
  // fires Vue's "inject() can only be used inside setup()" warning AND can yield a disconnected
  // store instance, breaking reactive dep tracking on `queries.value[key]`).
  const queryStore = useQueryStore();
  const notificationStore = useNotificationStore();
  const {translate} = useLanguage();
  const {getCarrierCapabilitiesForOrder} = useFormCapabilities();

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
  const setSilently = (fieldName: string, value: string | number | boolean | undefined): boolean => {
    if (form.getValue(fieldName) === value) return false;

    suppressTracking = true;
    try {
      setFieldValue(form, fieldName, value);
    } finally {
      suppressTracking = false;
    }

    return true;
  };

  const previousAxisValues: Record<AxisField, unknown> = {
    [FIELD_CARRIER]: form.getValue(FIELD_CARRIER),
    [FIELD_PACKAGE_TYPE]: form.getValue(FIELD_PACKAGE_TYPE),
    [FIELD_DELIVERY_TYPE]: form.getValue(FIELD_DELIVERY_TYPE),
  };

  // Drop the rolling "capabilities cleared" notification on any form change. The order- and
  // shipment-watchers later in the same tick will re-add it via `notifyClears` if the new
  // selection is still invalid; otherwise the notification stays cleared, so a successful
  // re-pick doesn't leave a stale toast on screen. `flush: 'sync'` so the remove fires before
  // any pre-flush watcher's add path on the same tick — the add then wins and the user sees
  // the up-to-date message instead of the previous attempt's.
  watch(
    [
      () => form.getValue(FIELD_CARRIER),
      () => form.getValue(FIELD_PACKAGE_TYPE),
      () => form.getValue(FIELD_DELIVERY_TYPE),
      ...allOptionKeys.map((key) => () => form.getValue(optionFieldName(key))),
    ],
    () => {
      notificationStore.remove(CAPABILITIES_CLEARED_NOTIFICATION_ID);
    },
    {flush: 'sync'},
  );

  watch(
    [
      () => form.getValue(FIELD_CARRIER),
      () => form.getValue(FIELD_PACKAGE_TYPE),
      () => form.getValue(FIELD_DELIVERY_TYPE),
    ],
    ([carrierValue, packageTypeValue, deliveryTypeValue]) => {
      // Capture lastModified attribution ONLY for genuine user changes — silent writes from
      // the auto-clear itself shouldn't masquerade as user intent.
      if (!suppressTracking) {
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
      }

      // Always mirror current values into the snapshot — under suppressTracking the prior
      // snapshot becomes stale (the auto-clear just rewrote a field), and a future genuine
      // user change would otherwise capture the pre-clear value as `lastModifiedPreviousValue`
      // and revert to a value already known to be invalid.
      previousAxisValues[FIELD_CARRIER] = carrierValue;
      previousAxisValues[FIELD_PACKAGE_TYPE] = packageTypeValue;
      previousAxisValues[FIELD_DELIVERY_TYPE] = deliveryTypeValue;
    },
    // `sync` flush is essential here: `suppressTracking` is set inside `setSilently`'s
    // `try`/`finally`, which is synchronous. With Vue's default (`pre`) flush, the watcher
    // callback runs LATER — by which time `suppressTracking` has been reset to `false`, and
    // the silent write gets attributed to the user. That makes `lastModifiedPreviousValue`
    // capture the value the auto-clear just overwrote, and the next `revertAxis` reverts to
    // it — producing a flip-flop cycle visible to the merchant. Sync flush fires the callback
    // inside the ref setter so it observes `suppressTracking === true`.
    {flush: 'sync'},
  );

  /**
   * Roll back the just-touched axis. If we have a previous valid value to revert to (the user
   * picked something invalid AFTER having a valid choice), restore that — preserves the
   * previous selection so the form doesn't surprise the user with an emptied field. If there's
   * no revert target (axis was never set, or this is the first-ever change on a freshly-opened
   * modal), clear the field. Returns whether a previous value was actually restored so the
   * caller can pick the right notification line.
   */
  const revertAxis = (axis: AxisField): {restored: boolean; changed: boolean} => {
    const target = lastModifiedAxis === axis ? lastModifiedPreviousValue : undefined;
    const changed = setSilently(axis, target as string | number | boolean | undefined);

    return {restored: target !== undefined, changed};
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
   * Carrier-switch reset: keep the new carrier (switching is "fresh start" intent), apply the
   * inherited defaults for `packageType` / `deliveryType`, and emit no notification (the UI
   * already shifts significantly on carrier change). Called from BOTH the order watcher and
   * the shipment watcher's invalid-combo branch — both paths converge on the same reset.
   */
  const applyCarrierDefaults = (): void => {
    const carrierName = form.getValue<string | undefined>(FIELD_CARRIER);
    const pkgDefault = carrierName ? inheritedDefault(carrierName, FIELD_PACKAGE_TYPE) : undefined;
    const dtDefault = carrierName ? inheritedDefault(carrierName, FIELD_DELIVERY_TYPE) : undefined;

    // Only write fields when an inherited default exists. Writing `undefined` triggers
    // form-builder's RadioGroup `defaultValue` fallback, which then re-emits the default
    // value as if the user had clicked it — looks like a user change to the axis-tracker
    // and re-attributes `lastModifiedAxis` away from CARRIER, which spirals into a cycle
    // where each auto-clear write produces another "user-like" change that triggers the
    // shipment query again with the same invalid combo.
    if (pkgDefault !== undefined) {
      setSilently(FIELD_PACKAGE_TYPE, pkgDefault as string | number | boolean | undefined);
    }

    if (dtDefault !== undefined) {
      setSilently(FIELD_DELIVERY_TYPE, dtDefault as string | number | boolean | undefined);
    }
  };

  /**
   * Build the user-visible notification line for an axis revert/clear. `restored: true` means
   * the prior valid value was put back; `false` means the field was nulled because there was
   * no prior valid value to fall back to.
   */
  const lineForAxisClear = (axis: AxisField, restored: boolean): string => {
    const fieldLabel = translate(FIELD_TO_LABEL_KEY[axis]);

    return restored
      ? translate({key: 'capabilities_cleared_field_reverted', args: {field: fieldLabel}})
      : translate({key: 'capabilities_cleared_field_cleared', args: {field: fieldLabel}});
  };

  const lineForOptionClear = (optionKey: string): string => {
    const fieldLabel = translate(optionLabelKey(optionKey));

    return translate({key: 'capabilities_cleared_option_cleared', args: {field: fieldLabel}});
  };

  const notifyClears = (lines: string[]): void => {
    if (lines.length === 0) return;

    addCapabilitiesClearNotification(notificationStore, translate('capabilities_cleared'), lines);
  };

  /**
   * Decide how to react when the shipment query confirms the current selection is an invalid
   * combo.
   *
   * - Carrier change: silent reset via `applyCarrierDefaults` (no notification).
   * - PackageType / deliveryType change: revert THAT axis to its prior valid value (or clear
   *   if there's no revert target), with a notification explaining which path was taken.
   * - No recent user action (modal pre-fill, weight slider): default-clear deliveryType with
   *   a notification.
   *
   * Returns the lines for the rolling notification. An empty array means "carrier change —
   * silent."
   */
  const resolveInvalidCombo = (): string[] => {
    if (lastModifiedAxis === FIELD_CARRIER) {
      applyCarrierDefaults();

      return [];
    }

    if (lastModifiedAxis === FIELD_PACKAGE_TYPE || lastModifiedAxis === FIELD_DELIVERY_TYPE) {
      const {restored, changed} = revertAxis(lastModifiedAxis);

      return changed ? [lineForAxisClear(lastModifiedAxis, restored)] : [];
    }

    const wrote = setSilently(FIELD_DELIVERY_TYPE, undefined);

    return wrote ? [lineForAxisClear(FIELD_DELIVERY_TYPE, false)] : [];
  };

  /**
   * Synchronous cross-axis validation against the order query — runs whenever the carrier
   * dropdown or its underlying data changes. Catches "current packageType isn't even in the
   * carrier's order-level union" without waiting for the shipment query round trip.
   */
  watch(
    () => {
      const carrier = getCarrierCapabilitiesForOrder(form);
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

      const packageTypeInvalid = Boolean(packageType) && !packageTypesInCarrier.includes(packageType as string);
      const deliveryTypeInvalid = Boolean(deliveryType) && !deliveryTypesInCarrier.includes(deliveryType as string);

      if (!packageTypeInvalid && !deliveryTypeInvalid) return;

      // Carrier-change special case: silent reset via inherited defaults. Without this branch
      // the order watcher would clear/notify before the (debounced) shipment watcher gets a
      // chance to apply the same silent reset, contradicting the silent-on-carrier rule.
      if (lastModifiedAxis === FIELD_CARRIER) {
        applyCarrierDefaults();

        return;
      }

      const lines: string[] = [];

      // Clear / revert the axis that's actually invalid for the current carrier — not
      // `lastModifiedAxis`. The order-data watcher fires on weight / cc changes too, where
      // `lastModifiedAxis` may not point at the field that's now out-of-list. Targeting the
      // invalid axis directly avoids clearing deliveryType in response to an invalid
      // packageType, and vice versa.
      if (packageTypeInvalid) {
        const {restored, changed} = revertAxis(FIELD_PACKAGE_TYPE);

        if (changed) lines.push(lineForAxisClear(FIELD_PACKAGE_TYPE, restored));
      }

      if (deliveryTypeInvalid) {
        const {restored, changed} = revertAxis(FIELD_DELIVERY_TYPE);

        if (changed) lines.push(lineForAxisClear(FIELD_DELIVERY_TYPE, restored));
      }

      notifyClears(lines);
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
        notifyClears(resolveInvalidCombo());

        return;
      }

      const availableOptionKeys = Object.keys(snapshot.carrier.options);
      const lines: string[] = [];
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
          lines.push(lineForOptionClear(optionKey));
        }
      }

      notifyClears(lines);
    },
  );
};
