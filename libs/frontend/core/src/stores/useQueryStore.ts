import {QueryClient, useQueryClient} from '@tanstack/vue-query';
import {Ref, ref} from 'vue';
import {
  useDeleteShipmentsMutation,
  useExportOrdersMutation,
  useOrderQuery,
  usePrintOrdersMutation,
  usePrintShipmentsMutation,
  useUpdateOrdersMutation,
  useUpdatePluginSettingsMutation,
  useUpdateShipmentsMutation,
} from '../actions';
import {EndpointName} from '@myparcel-pdk/common';
import {MutationMode} from '../services';
import {defineStore} from 'pinia';
import {getOrderId} from '../utils';

export type QueryObject<I extends EndpointName = EndpointName> = Record<I, ResolvedQuery<I>>;

export type ResolvedQuery<I extends EndpointName = EndpointName> = I extends EndpointName.GET_ORDERS
  ? ReturnType<typeof useOrderQuery>
  : I extends EndpointName.EXPORT_ORDERS
  ? ReturnType<typeof useExportOrdersMutation>
  : I extends EndpointName.PRINT_ORDERS
  ? ReturnType<typeof usePrintOrdersMutation>
  : I extends EndpointName.UPDATE_ORDERS
  ? ReturnType<typeof useUpdateOrdersMutation>
  : I extends EndpointName.PRINT_SHIPMENTS
  ? ReturnType<typeof usePrintShipmentsMutation>
  : I extends EndpointName.UPDATE_SHIPMENTS
  ? ReturnType<typeof useUpdateShipmentsMutation>
  : I extends EndpointName.DELETE_SHIPMENTS
  ? ReturnType<typeof useDeleteShipmentsMutation>
  : I extends EndpointName.UPDATE_PLUGIN_SETTINGS
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : I extends EndpointName.UPDATE_PRODUCT_SETTINGS
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : unknown;

export const useQueryStore = defineStore('query', () => {
  const queries = ref({} as QueryObject);
  const queryClient: Ref<QueryClient | undefined> = ref<QueryClient>();

  const has = <N extends EndpointName>(key: N): boolean => !!queries.value[key];

  const get = <N extends EndpointName>(key: N): ResolvedQuery<N> => {
    if (!has(key)) {
      throw new Error(`No query found for key ${key}`);
    }

    // @ts-expect-error todo
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

    /**
     * Queries must be registered manually, because vue-query hooks can only be
     * called from a component's setup() function.
     *
     * @param {string | null} orderId
     * @param {MutationMode} mode
     */
    registerOrderQueries: (orderId?: string | null, mode: MutationMode = MutationMode.DEFAULT) => {
      const id = orderId ?? getOrderId();

      if (!id) {
        throw new Error('No order id found');
      }

      register(EndpointName.GET_ORDERS, useOrderQuery(id));

      register(EndpointName.EXPORT_ORDERS, useExportOrdersMutation(mode));
      register(EndpointName.PRINT_ORDERS, usePrintOrdersMutation());
      register(EndpointName.UPDATE_ORDERS, useUpdateOrdersMutation());

      register(EndpointName.DELETE_SHIPMENTS, useDeleteShipmentsMutation());
      register(EndpointName.PRINT_SHIPMENTS, usePrintShipmentsMutation());
      register(EndpointName.UPDATE_SHIPMENTS, useUpdateShipmentsMutation());
    },

    queryClient,
  };
});
