import {type BackendEndpoint} from '@myparcel-pdk/common';
import {useQueryStore} from '../stores/useQueryStore';
import {type ResolvedQuery} from '../stores/types';
import {type PlainModifier} from '../actions/executors/types';

export const useStoreQuery = <E extends BackendEndpoint>(endpoint: E, suffix?: PlainModifier): ResolvedQuery<E> => {
  const queryStore = useQueryStore();

  return queryStore.get(endpoint, suffix) as ResolvedQuery<E>;
};
