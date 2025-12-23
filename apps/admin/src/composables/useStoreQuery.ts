import {type BackendEndpoint} from '@myparcel-dev/pdk-common';
import {type ResolvedQuery, useQueryStore} from '../stores';
import {type PlainModifier} from '../actions';

export const useStoreQuery = <E extends BackendEndpoint>(endpoint: E, suffix?: PlainModifier): ResolvedQuery<E> => {
  const queryStore = useQueryStore();

  return queryStore.get(endpoint, suffix) as ResolvedQuery<E>;
};
