import {type BackendOrderEndpoint} from '../../types/endpoints.types';
import {type OrderIds} from '../../types/common.types';
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
