import {computed, type ComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {validateId} from '../../utils/validateId';
import {getOrderId} from '../../utils/getOrderId';
import {useQueryStore} from '../../stores/useQueryStore';
import {type ResolvedQuery} from '../../stores/types';
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
