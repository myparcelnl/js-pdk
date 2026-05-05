import {toValue} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {AdminContextKey, BackendEndpoint, type CarrierModel} from '@myparcel-dev/pdk-common';
import {FIELD_CARRIER} from '../shipmentOptions';
import {getOrderId} from '../../utils';
import {useQueryStore} from '../../stores';
import {useContext} from '../../composables';

/**
 * Resolve the chosen carrier's order-level capability data — destination + weight scope only,
 * no carrier/packageType/deliveryType narrowing. Used to populate carrier / packageType /
 * deliveryType dropdowns from the per-carrier flat arrays.
 *
 * Order-level data is the merge of the order capabilities query (when registered) and the
 * static `DynamicContext.carriers` superset:
 *
 * 1. If the order query is registered for the current `orderId` and `status === 'success'`,
 *    return the matching carrier from its results — these reflect only what's currently valid
 *    for the order's destination + weight.
 * 2. Otherwise fall back to `DynamicContext.carriers` — the contract-definition superset that
 *    represents everything the account is contractually allowed to do.
 *
 * `requires` / `excludes` on options are NEVER populated through this path; they only appear
 * on the shipment query response (`getCarrierForShipment`).
 */
export const getCarrierForOrder = (form: FormInstance): CarrierModel | undefined => {
  const chosenCarrier = form.getValue(FIELD_CARRIER);
  const orderId = getOrderId();

  if (typeof orderId === 'string') {
    const queryStore = useQueryStore();
    const modifier = `${orderId}.order`;

    if (queryStore.has(BackendEndpoint.ProxyCapabilities, modifier)) {
      const query = queryStore.get(BackendEndpoint.ProxyCapabilities, modifier);

      if (toValue(query.status) === 'success') {
        const carriers = (toValue(query.data) ?? []) as CarrierModel[];
        const fromQuery = carriers.find((carrier) => carrier.carrier === chosenCarrier);

        if (fromQuery) {
          return fromQuery;
        }
      }
    }
  }

  const dynamicContext = useContext(AdminContextKey.Dynamic);

  return dynamicContext.carriers.find((carrier) => carrier.carrier === chosenCarrier);
};
