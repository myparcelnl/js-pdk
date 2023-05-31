import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type ResolvedQuery, useQueryStore} from '../stores';

export const useStoreQuery = <E extends BackendEndpoint>(endpoint: E, suffix?: string | number): ResolvedQuery<E> => {
  const queryStore = useQueryStore();

  return queryStore.get(endpoint, suffix) as ResolvedQuery<E>;
};
