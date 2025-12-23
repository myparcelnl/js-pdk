import {computed, type ComputedRef, toValue} from 'vue';
import {type BackendEndpoint} from '@myparcel-dev/pdk-common';
import {getOrderId, validateId} from '../../utils';
import {type ResolvedQuery, useQueryStore} from '../../stores';
import {useOrder} from './useOrder';

export interface UseOrderData {
  loading: ComputedRef<boolean>;
  order: ComputedRef;
  query: ResolvedQuery<BackendEndpoint.FetchOrders>;
}

export const useOrderData = (externalIdentifier?: string): UseOrderData => {
  const orderId = validateId(externalIdentifier ?? getOrderId());

  const queryStore = useQueryStore();

  const fetchQuery = useOrder(orderId);

  const allQueries = queryStore.getQueriesForOrder(orderId);

  return {
    loading: computed(() => {
      return Object.values(toValue(allQueries)).some((item) => (item ? toValue(item.isLoading) : false));
    }),
    order: computed(() => toValue(fetchQuery.data)),
    query: fetchQuery,
  };
};
