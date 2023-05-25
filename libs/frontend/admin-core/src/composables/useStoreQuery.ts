import {BackendEndpoint} from '@myparcel-pdk/common';
import {ResolvedQuery, useQueryStore} from '../stores';

export const useStoreQuery = <E extends BackendEndpoint>(endpoint: E, suffix?: string): ResolvedQuery<E> => {
  const queryStore = useQueryStore();
  const identifier = [endpoint, suffix].filter(Boolean).join('.') as BackendEndpoint;

  return queryStore.get(identifier) as ResolvedQuery<E>;
};
