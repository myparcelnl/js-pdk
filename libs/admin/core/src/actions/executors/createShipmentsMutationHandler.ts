import {type BackendShipmentEndpoint, type ShipmentIds} from '@myparcel-pdk/admin-common';
import {type QueryHandler} from './types';
import {createHandlerWithParameters} from './createHandlerWithParameters';

export const createShipmentsMutationHandler = <E extends BackendShipmentEndpoint>(
  endpoint: E,
  allowBulk = false,
): QueryHandler<E> => {
  return (context) => {
    return createHandlerWithParameters(context.parameters?.shipmentIds as ShipmentIds, endpoint, context, allowBulk);
  };
};
