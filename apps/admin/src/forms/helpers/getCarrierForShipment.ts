import {toValue} from 'vue';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {BackendEndpoint, type CarrierModel} from '@myparcel-dev/pdk-common';
import {FIELD_CARRIER} from '../shipmentOptions';
import {getOrderId} from '../../utils';
import {useQueryStore} from '../../stores';
import {getCarrierForOrder} from './getCarrierForOrder';

/**
 * Resolve the chosen carrier's shipment-level capability data — narrowed to the full selection
 * (carrier + packageType + deliveryType + cc + weight). Used by option metadata consumers
 * (`hasShipmentOption`, `getInsuranceOptions`, `createShipmentOptionField`'s requires/excludes
 * locking) because only this path carries `requires` / `excludes` per option.
 *
 * Resolution order:
 *
 * 1. If the shipment query is registered for the current `orderId`, in `success` state, and
 *    its `results` contain a matching carrier, return it. Refer to {@link CarrierModel} —
 *    `requires` / `excludes` will be present here when the API populates them.
 * 2. Otherwise fall back to `getCarrierForOrder(form)`. Note this fallback DOES NOT carry
 *    `requires` / `excludes` (they're absent on the order query and on DynamicContext) — so
 *    consumers that depend on those fields will simply not lock anything during the fallback
 *    window. That's an acceptable graceful state on first paint or while the shipment query
 *    is loading.
 */
export const getCarrierForShipment = (form: FormInstance): CarrierModel | undefined => {
  const chosenCarrier = form.getValue(FIELD_CARRIER);
  const orderId = getOrderId();

  if (typeof orderId === 'string') {
    const queryStore = useQueryStore();
    const modifier = `${orderId}.shipment`;

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

  return getCarrierForOrder(form);
};
