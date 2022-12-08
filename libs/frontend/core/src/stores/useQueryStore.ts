import {QueryClient, useQueryClient} from '@tanstack/vue-query';
import {Ref, ref} from 'vue';
import {
  useDeleteShipmentsMutation,
  useExportOrdersMutation,
  useInstanceContext,
  useModalOrder,
  useOrderQuery,
  usePrintOrdersMutation,
  useRefreshShipmentsQuery,
  useUpdateOrdersMutation,
} from '../composables';
import {EndpointName} from '@myparcel-pdk/common';
import {InstanceContextKey} from '../types';
import {MutationMode} from '../services';
import {defineStore} from 'pinia';

export type QueryObject<I extends EndpointName = EndpointName> = Record<I, ResolvedQuery<I>>;

export type ResolvedQuery<I extends EndpointName = EndpointName> = I extends EndpointName.EXPORT_ORDERS
  ? ReturnType<typeof useExportOrdersMutation>
  : I extends EndpointName.GET_ORDERS
  ? ReturnType<typeof useOrderQuery>
  : I extends EndpointName.DELETE_SHIPMENTS
  ? ReturnType<typeof useDeleteShipmentsMutation>
  : I extends EndpointName.PRINT_ORDERS
  ? ReturnType<typeof usePrintOrdersMutation>
  : I extends EndpointName.UPDATE_ORDERS
  ? ReturnType<typeof useUpdateOrdersMutation>
  : I extends EndpointName.REFRESH_SHIPMENTS
  ? ReturnType<typeof useRefreshShipmentsQuery>
  : unknown;

export const useQueryStore = defineStore('query', () => {
  const queries = ref({} as QueryObject);
  const queryClient: Ref<QueryClient | undefined> = ref<QueryClient>();

  const has = <N extends EndpointName>(key: N): boolean => !!queries.value[key];

  const get = <N extends EndpointName>(key: N): ResolvedQuery<N> => {
    if (!has(key)) {
      throw new Error(`No query found for key ${key}`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return queries.value[key];
  };

  const register = <N extends EndpointName>(key: N, query: ResolvedQuery<N>): void => {
    if (!queryClient.value) {
      queryClient.value = useQueryClient();
    }

    queries.value[key] = query;
  };

  return {
    queries,
    get,
    has,
    register,

    registerOrderQueries: (orderId?: string | null, mode: MutationMode = MutationMode.DEFAULT) => {
      const id = orderId ?? useModalOrder() ?? useInstanceContext(InstanceContextKey.ORDER_IDENTIFIER);

      if (!id) {
        throw new Error('No order id found');
      }

      register(EndpointName.GET_ORDERS, useOrderQuery(id));

      register(EndpointName.EXPORT_ORDERS, useExportOrdersMutation(mode));
      register(EndpointName.UPDATE_ORDERS, useUpdateOrdersMutation());

      register(EndpointName.DELETE_SHIPMENTS, useDeleteShipmentsMutation());
      register(EndpointName.REFRESH_SHIPMENTS, useRefreshShipmentsQuery());
    },

    queryClient,
  };
});
