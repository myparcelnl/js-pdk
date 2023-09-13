import {type BackendOrderEndpoint, type OrderIds} from '@myparcel-pdk/admin-common';
import {type QueryHandler} from './types';
import {createHandlerWithParameters} from './createHandlerWithParameters';

export const createOrdersMutationHandler = <E extends BackendOrderEndpoint>(
  endpoint: E,
  allowBulk = false,
): QueryHandler<E> => {
  return (context) => {
    return createHandlerWithParameters(context.parameters?.orderIds as OrderIds, endpoint, context, allowBulk);
  };
};
