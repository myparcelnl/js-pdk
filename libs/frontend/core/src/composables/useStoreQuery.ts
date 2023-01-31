import {ResolvedQuery, useQueryStore} from '../stores';
import {EndpointName} from '@myparcel-pdk/common';

export const useStoreQuery = <E extends EndpointName>(endpoint: E): ResolvedQuery<E> => {
  const queryStore = useQueryStore();

  if (!queryStore.has(endpoint)) {
    throw new Error(`Query not registered: ${endpoint}`);
  }

  return queryStore.get(endpoint);
};
