import {computed, type ComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {type BackendEndpoint, type Plugin} from '@myparcel-pdk/common';
import {getOrderId, validateOrderId} from '../../utils';
import {type ResolvedQuery, useQueryStore} from '../../stores';
import {useOrder} from './useOrder';

export interface UseOrderData {
  loading: ComputedRef<boolean>;
  order: ComputedRef<Plugin.ModelPdkOrder | undefined>;
  query: ResolvedQuery<BackendEndpoint.FetchOrders>;
}

export const useOrderData = (externalIdentifier?: string): UseOrderData => {
  const orderId = validateOrderId(externalIdentifier ?? getOrderId());

  const queryStore = useQueryStore();

  const fetchQuery = useOrder(orderId);

  const allQueries = queryStore.getQueriesForOrder(orderId);

  return {
    loading: computed(() => Object.values(get(allQueries)).some((item) => (item ? get(item.isLoading) : false))),
    order: computed(() => get(fetchQuery.data)),
    query: fetchQuery,
  };
};
