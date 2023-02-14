import {AdminContextKey} from '../types';
import {ContextQuery} from '../stores';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {useStoreQuery} from './useStoreQuery';

export const useStoreContextQuery = <C extends AdminContextKey = AdminContextKey.DYNAMIC>(
  contextKey?: C,
): ContextQuery<C> => {
  return useStoreQuery(BackendEndpoint.FETCH_CONTEXT, contextKey ?? AdminContextKey.DYNAMIC) as ContextQuery<C>;
};
