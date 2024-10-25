import {type BackendShipmentEndpoint} from '../../types/endpoints.types';
import {type ShipmentIds} from '../../types/common.types';
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
