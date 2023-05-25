import {AdminContextKey} from '../types';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {ContextQuery} from '../stores';
import {useStoreQuery} from './useStoreQuery';

export const useStoreContextQuery = <C extends AdminContextKey = AdminContextKey.Dynamic>(
  contextKey?: C,
): ContextQuery<C> => {
  return useStoreQuery(BackendEndpoint.FetchContext, contextKey ?? AdminContextKey.Dynamic) as ContextQuery<C>;
};
