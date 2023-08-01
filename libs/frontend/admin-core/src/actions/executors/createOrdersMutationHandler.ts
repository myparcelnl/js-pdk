import {type BackendOrderEndpoint} from '@myparcel-pdk/common';
import {type OrderIds} from '../../types';
import {type QueryHandler} from './types';
import {createHandlerWithParameters} from './createHandlerWithParameters';

export const createOrdersMutationHandler = <E extends BackendOrderEndpoint>(endpoint: E): QueryHandler<E> => {
  return (context) => {
    return createHandlerWithParameters(context.parameters?.orderIds as OrderIds, endpoint, context);
  };
};
