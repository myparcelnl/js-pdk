import {toValue} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {AdminContextKey, BackendEndpoint, type CarrierModel} from '@myparcel-dev/pdk-common';
import {FIELD_CARRIER} from '../shipmentOptions';
import {useQueryStore} from '../../stores';
import {useContext} from '../../composables';

/**
 * Resolve the chosen carrier's full model.
 *
 * Prefers the contextual ProxyCapabilities query (set up by `createShipmentOptionsForm`)
 * when it has fresh data for the current selection. Falls back to the contract-definition
 * carriers from `DynamicContext` whenever the query is loading, errored, or otherwise not
 * in a `success` state — preventing form fields from reading stale capability metadata
 * that doesn't match the form's current selection.
 */
export const getCarrier = (form: FormInstance): CarrierModel | undefined => {
  const chosenCarrier = form.getValue(FIELD_CARRIER);
  const queryStore = useQueryStore();

  if (queryStore.has(BackendEndpoint.ProxyCapabilities)) {
    const query = queryStore.get(BackendEndpoint.ProxyCapabilities);

    // Only consume cache when the latest fetch for the current key succeeded. While loading,
    // refetching after a key change, or in an error state, the cache may not match what's
    // selected on screen — fall through to the dynamic-context fallback in those cases.
    if (toValue(query.status) === 'success') {
      const carriers = toValue(query.data) ?? [];
      const fromQuery = carriers.find((carrier) => carrier.carrier === chosenCarrier);

      if (fromQuery) {
        return fromQuery;
      }
    }
  }

  const dynamicContext = useContext(AdminContextKey.Dynamic);

  return dynamicContext.carriers.find((carrier) => carrier.carrier === chosenCarrier);
};
