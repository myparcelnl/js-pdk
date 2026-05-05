import {computed} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {BackendEndpoint, type Plugin} from '@myparcel-dev/pdk-common';
import {useQueryStore} from '../../stores';
import {useProxyCapabilitiesQuery} from '../../actions/composables/queries/account/useProxyCapabilitiesQuery';
import {useCapabilitiesWatcher, type FormInput, type OrderInput} from './useCapabilitiesWatcher';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_PACKAGE_TYPE} from './field';

/**
 * Wire the ProxyCapabilities query into the shipment-options form for a single order.
 *
 * Builds a debounced selection ref from the order context (cc, weight) merged with the form's
 * live carrier / packageType / deliveryType fields, runs the contextual query, and registers
 * it in the query store keyed by orderId. `getCarrier` reads the same store and finds the right
 * entry per order — no cross-contamination across orders viewed in the same admin session.
 *
 * Shipment-option toggles deliberately do NOT drive refetches: the capabilities response carries
 * each option's `requires` / `excludes` / `isSelectedByDefault`, so option interactions are
 * resolved client-side without further round-trips.
 *
 * Skipped for orders without an externalIdentifier (no key to register under and no per-order
 * context to fetch).
 */
export const wireProxyCapabilities = (
  form: FormInstance,
  order: Plugin.ModelContextOrderDataContext,
): void => {
  const orderId = order.externalIdentifier;

  if (!orderId) return;

  const orderInput: OrderInput = {
    cc: order.shippingAddress?.cc,
    weight: order.physicalProperties?.initialWeight,
  };

  const formInput = computed<FormInput>(() => ({
    carrier: form.values[FIELD_CARRIER] as string | undefined,
    packageType: form.values[FIELD_PACKAGE_TYPE] as string | undefined,
    deliveryType: form.values[FIELD_DELIVERY_TYPE] as string | undefined,
  }));

  const selection = useCapabilitiesWatcher(orderInput, formInput);
  const query = useProxyCapabilitiesQuery(selection);

  useQueryStore().register(BackendEndpoint.ProxyCapabilities, orderId, query);
};
