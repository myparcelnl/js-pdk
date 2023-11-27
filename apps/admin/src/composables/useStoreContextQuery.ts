import {AdminContextKey} from '../types';
import {type ContextQuery} from '../stores';
import {BackendEndpoint} from '../data';
import {useStoreQuery} from './useStoreQuery';

export const useStoreContextQuery = <C extends AdminContextKey = AdminContextKey.Dynamic>(
  contextKey?: C,
): ContextQuery<C> => {
  return useStoreQuery(BackendEndpoint.FetchContext, contextKey ?? AdminContextKey.Dynamic) as ContextQuery<C>;
};