import {QueryClient, useQueryClient} from '@tanstack/vue-query';
import {Ref, ref} from 'vue';
import {useExportOrdersQuery, useOrderQuery, useUpdateOrdersQuery} from '../';
import {defineStore} from 'pinia';
import {useDeleteLabelsQuery} from '../composables/queries/useDeleteLabelsQuery';

export type QueryObject<I extends QueryId = QueryId> = Record<I, ResolvedQuery<I>>;

export type ResolvedQuery<I extends QueryId = QueryId> = I extends QueryId.EXPORT_ORDERS
  ? ReturnType<typeof useExportOrdersQuery>
  : I extends QueryId.ORDER
  ? ReturnType<typeof useOrderQuery>
  : I extends QueryId.DELETE_LABELS
  ? ReturnType<typeof useDeleteLabelsQuery>
  : I extends QueryId.UPDATE_ORDERS
  ? ReturnType<typeof useUpdateOrdersQuery>
  : unknown;

export enum QueryId {
  DELETE_LABELS = 'deleteLabels',
  EXPORT_ORDERS = 'exportOrders',
  ORDER = 'order',
  UPDATE_ORDERS = 'updateOrders',
}

export const useQueryStore = defineStore('query', () => {
  const queries = ref({} as QueryObject);
  const queryClient: Ref<QueryClient | undefined> = ref<QueryClient>();

  const has = <I extends QueryId>(key: I): boolean => !!queries.value[key];

  const get = <I extends QueryId>(key: I): ResolvedQuery<I> => {
    if (!has(key)) {
      throw new Error(`No query found for key ${key}`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return queries.value[key];
  };

  const register = <I extends QueryId>(key: I, query: ResolvedQuery<I>): void => {
    if (!queryClient.value) {
      queryClient.value = useQueryClient();
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    queries.value[key] = query;
  };

  return {
    queries,
    get,
    has,
    register,
    registerOrderQueries: (orderId?: string | null) => {
      register(QueryId.EXPORT_ORDERS, useExportOrdersQuery());
      register(QueryId.UPDATE_ORDERS, useUpdateOrdersQuery());

      register(QueryId.ORDER, useOrderQuery());
    },

    queryClient,
  };
});
