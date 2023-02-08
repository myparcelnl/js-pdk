import {ContextKey} from '../types';
import {ContextQuery} from '../stores';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {useStoreQuery} from './useStoreQuery';

export const useStoreContextQuery = <C extends ContextKey = ContextKey.DYNAMIC>(contextKey?: C): ContextQuery<C> => {
  return useStoreQuery(BackendEndpoint.FETCH_CONTEXT, contextKey ?? ContextKey.DYNAMIC) as ContextQuery<C>;
};
