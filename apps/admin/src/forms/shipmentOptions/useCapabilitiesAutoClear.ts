import {watch} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {TriState} from '@myparcel-dev/pdk-common';
import {addCapabilitiesClearNotification, getCarrierForOrder, getCarrierForShipment} from '../helpers';
import type {CapabilitiesClearEntry} from '../helpers';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_PACKAGE_TYPE, FIELD_SHIPMENT_OPTIONS_PREFIX} from './field';

type AxisField = typeof FIELD_CARRIER | typeof FIELD_PACKAGE_TYPE | typeof FIELD_DELIVERY_TYPE;

const FIELD_TO_LABEL: Record<AxisField, string> = {
  [FIELD_CARRIER]: 'carrier',
  [FIELD_PACKAGE_TYPE]: 'package_type',
  [FIELD_DELIVERY_TYPE]: 'delivery_type',
};

const isOptionFieldName = (name: string): boolean => name.startsWith(`${FIELD_SHIPMENT_OPTIONS_PREFIX}.`);
const optionKeyFromFieldName = (name: string): string => name.slice(FIELD_SHIPMENT_OPTIONS_PREFIX.length + 1);
const optionFieldName = (key: string): string => `${FIELD_SHIPMENT_OPTIONS_PREFIX}.${key}`;

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
 * Three independent invalidation sources are handled:
 *
 * 1. **Cross-axis (synchronous) — order data**: when the chosen carrier's `packageTypes` /
 *    `deliveryTypes` (from the order query) no longer contain the form's current value,
 *    we clear that field. The clear targets the user's most-recently-modified axis when
 *    that axis is one of (carrier / packageType / deliveryType); when no axis was just
 *    touched (pre-fill on modal open, or weight slider edits), we default to clearing
 *    deliveryType as the most permissive re-pick.
 * 2. **Shipment-empty — server invalidation**: when the shipment query returns `results: []`
 *    for the current selection, the server has confirmed the combination isn't valid. Same
 *    targeting rule applies.
 * 3. **Option key dropped — cross-axis effect on options**: when the shipment query's
 *    `results[0].options` no longer carries an option key the form has active, that option
 *    is cleared (`setValue(name, TriState.Inherit)`). Axis intent wins over an active
 *    option in this case.
 */
export const useCapabilitiesAutoClear = (form: FormInstance): void => {
  let lastModifiedAxis: AxisField | undefined;
  let suppressTracking = false;

  const setFormValueSilently = (name: string, value: unknown): void => {
    suppressTracking = true;
    try {
      form.setValue(name, value);
    } finally {
      suppressTracking = false;
    }
  };

  const previousAxisValues: Record<AxisField, unknown> = {
    [FIELD_CARRIER]: form.values[FIELD_CARRIER],
    [FIELD_PACKAGE_TYPE]: form.values[FIELD_PACKAGE_TYPE],
    [FIELD_DELIVERY_TYPE]: form.values[FIELD_DELIVERY_TYPE],
  };

  watch(
    [
      () => form.values[FIELD_CARRIER],
      () => form.values[FIELD_PACKAGE_TYPE],
      () => form.values[FIELD_DELIVERY_TYPE],
    ],
    ([carrierValue, packageTypeValue, deliveryTypeValue]) => {
      if (suppressTracking) return;

      if (carrierValue !== previousAxisValues[FIELD_CARRIER]) {
        lastModifiedAxis = FIELD_CARRIER;
      } else if (packageTypeValue !== previousAxisValues[FIELD_PACKAGE_TYPE]) {
        lastModifiedAxis = FIELD_PACKAGE_TYPE;
      } else if (deliveryTypeValue !== previousAxisValues[FIELD_DELIVERY_TYPE]) {
        lastModifiedAxis = FIELD_DELIVERY_TYPE;
      }

      previousAxisValues[FIELD_CARRIER] = carrierValue;
      previousAxisValues[FIELD_PACKAGE_TYPE] = packageTypeValue;
      previousAxisValues[FIELD_DELIVERY_TYPE] = deliveryTypeValue;
    },
  );

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
      const packageType = form.values[FIELD_PACKAGE_TYPE] as string | undefined;
      const deliveryType = form.values[FIELD_DELIVERY_TYPE] as string | undefined;

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

        setFormValueSilently(target, undefined);
        clears.push({field: FIELD_TO_LABEL[target], reason});
      }

      if (deliveryType && !deliveryTypesInCarrier.includes(deliveryType)) {
        const target = lastModifiedAxis === FIELD_CARRIER ? FIELD_DELIVERY_TYPE : pickAxisToClear();

        setFormValueSilently(target, undefined);
        clears.push({field: FIELD_TO_LABEL[target], reason});
      }

      if (clears.length > 0) {
        addCapabilitiesClearNotification(clears);
      }
    },
    {deep: true},
  );

  /**
   * Shipment-query empty-result watcher. When the server confirms an invalid combination
   * (or option keys disappear from the response), clear in priority order.
   */
  watch(
    () => {
      const carrier = getCarrierForShipment(form);

      return {
        availableOptionKeys: carrier?.options ? Object.keys(carrier.options) : undefined,
        carrierName: carrier?.carrier,
      };
    },
    ({availableOptionKeys, carrierName}) => {
      const clears: CapabilitiesClearEntry[] = [];

      if (availableOptionKeys) {
        // Shipment data is present — check active options against the response.
        for (const fieldName of Object.keys(form.values)) {
          if (!isOptionFieldName(fieldName)) continue;

          const value = form.values[fieldName];
          const isActive = value !== undefined && value !== TriState.Inherit && Boolean(value);

          if (!isActive) continue;

          const optionKey = optionKeyFromFieldName(fieldName);

          if (!availableOptionKeys.includes(optionKey)) {
            setFormValueSilently(fieldName, TriState.Inherit);
            clears.push({
              field: optionKey,
              reason: carrierName ? `not_available_for_${carrierName}_combination` : 'not_available_for_combination',
            });
          }
        }
      }

      if (clears.length > 0) {
        addCapabilitiesClearNotification(clears);
      }
    },
    {deep: true},
  );
};

// Re-export so consumers can clear an option from outside this composable when needed
// (e.g. createShipmentOptionField afterUpdate, when option-vs-option requires/excludes
// rolls back the just-toggled option).
export const clearOptionField = (form: FormInstance, optionKey: string): void => {
  form.setValue(optionFieldName(optionKey), TriState.Inherit);
};
