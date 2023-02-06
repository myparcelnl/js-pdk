import {ContextKey} from '../types';
import {ContextQuery} from '../stores';
import {EndpointName} from '@myparcel-pdk/common';
import {useStoreQuery} from './useStoreQuery';

export const useStoreContextQuery = <C extends ContextKey = ContextKey.DYNAMIC>(contextKey?: C): ContextQuery<C> => {
  return useStoreQuery(EndpointName.FETCH_CONTEXT, contextKey ?? ContextKey.DYNAMIC) as ContextQuery<C>;
};
