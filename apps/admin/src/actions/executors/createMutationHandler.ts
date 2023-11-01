import {type BackendEndpoint} from '../../data';
import {type QueryHandler, type QueryModifier} from './types';
import {doMutate} from './doMutate';

export const createMutationHandler = <E extends BackendEndpoint>(
  endpoint: E,
  suffix?: QueryModifier<E>,
): QueryHandler<E> => {
  return (context) => doMutate(endpoint, suffix, context);
};
