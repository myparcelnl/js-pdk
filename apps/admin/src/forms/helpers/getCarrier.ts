import {toValue} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {AdminContextKey, BackendEndpoint, type CarrierModel} from '@myparcel-dev/pdk-common';
import {FIELD_CARRIER} from '../shipmentOptions';
import {useQueryStore} from '../../stores';
import {useContext} from '../../composables';

/**
 * Resolve the chosen carrier's full model.
 *
 * Prefers the contextual ProxyCapabilities query (set up by `createShipmentOptionsForm`) when
 * it has data — those carriers reflect the live capabilities for the order's destination,
 * weight, package type, etc. Falls back to the contract-definition carriers from
 * `DynamicContext` otherwise (settings page, query not yet registered, no cc on the order).
 */
export const getCarrier = (form: FormInstance): CarrierModel | undefined => {
  const chosenCarrier = form.getValue(FIELD_CARRIER);
  const queryStore = useQueryStore();

  if (queryStore.has(BackendEndpoint.ProxyCapabilities)) {
    const query = queryStore.get(BackendEndpoint.ProxyCapabilities);
    const carriers = toValue(query.data) ?? [];
    const fromQuery = carriers.find((carrier) => carrier.carrier === chosenCarrier);

    if (fromQuery) {
      return fromQuery;
    }
  }

  const dynamicContext = useContext(AdminContextKey.Dynamic);

  return dynamicContext.carriers.find((carrier) => carrier.carrier === chosenCarrier);
};
