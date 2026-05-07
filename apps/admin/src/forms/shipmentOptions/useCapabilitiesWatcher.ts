import {computed, toValue, type MaybeRefOrGetter, type Ref} from 'vue';
import {refDebounced} from '@vueuse/core';
import {type CapabilitiesSelection} from '../../actions/composables/queries/account/useShipmentCapabilitiesQuery';

const DEBOUNCE_MS = 100;

export type OrderInput = {cc?: string; weight?: number};
export type FormInput = {carrier?: string; packageType?: string; deliveryType?: string};

/**
 * Merge an order source and a shipment-options form source into a single debounced selection
 * ref suitable for the order and shipment capabilities queries. Rapid form-state changes
 * (clicking through carriers, toggling options) collapse into one query refetch after the
 * user pauses.
 *
 * Inputs accept any of `Ref<T>`, `ComputedRef<T>`, or `() => T` so callers can pass whatever
 * shape they already have.
 */
export const useCapabilitiesWatcher = (
  order: MaybeRefOrGetter<OrderInput>,
  form: MaybeRefOrGetter<FormInput>,
): Readonly<Ref<CapabilitiesSelection>> => {
  const merged = computed<CapabilitiesSelection>(() => ({
    ...toValue(order),
    ...toValue(form),
  }));

  return refDebounced(merged, DEBOUNCE_MS);
};
