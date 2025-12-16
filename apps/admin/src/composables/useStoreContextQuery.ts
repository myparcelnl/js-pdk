import {AdminContextKey, BackendEndpoint} from '@myparcel-dev/pdk-common';
import {type ContextQuery} from '../stores';
import {useStoreQuery} from './useStoreQuery';

export const useStoreContextQuery = <C extends AdminContextKey = AdminContextKey.Dynamic>(
  contextKey?: C,
): ContextQuery<C> => {
  return useStoreQuery(BackendEndpoint.FetchContext, contextKey ?? AdminContextKey.Dynamic) as ContextQuery<C>;
};
