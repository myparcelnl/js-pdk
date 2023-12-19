import {computed, type ComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {type BackendEndpoint} from '@myparcel-pdk/common';
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
    loading: computed(() => Object.values(get(allQueries)).some((item) => (item ? get(item.isLoading) : false))),
    order: computed(() => get(fetchQuery.data)),
    query: fetchQuery,
  };
};
