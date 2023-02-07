import {ResolvedQuery, useQueryStore} from '../stores';
import {EndpointName} from '@myparcel-pdk/common/src';

export const useStoreQuery = <E extends EndpointName>(endpoint: E, suffix?: string): ResolvedQuery<E> => {
  const queryStore = useQueryStore();
  const identifier = [endpoint, suffix].filter(Boolean).join('.') as EndpointName;

  if (!queryStore.has(identifier)) {
    throw new Error(`Query not registered: ${identifier}`);
  }

  return queryStore.get(identifier) as ResolvedQuery<E>;
};
