import {QueryClient, useQueryClient} from '@tanstack/vue-query';
import {Ref, ref} from 'vue';
import {
  useCreateReturnShipmentsMutation,
  useCreateWebhooksMutation,
  useDeleteShipmentsMutation,
  useDeleteWebhooksMutation,
  useExportOrdersMutation,
  useFetchContextQuery,
  useFetchOrdersQuery,
  useFetchWebhooksQuery,
  usePrintOrdersMutation,
  usePrintShipmentsMutation,
  useUpdateAccountMutation,
  useUpdateOrdersMutation,
  useUpdatePluginSettingsMutation,
  useUpdateShipmentsMutation,
} from '../actions';
import {EndpointName} from '@myparcel-pdk/common';
import {MutationMode} from '../services';
import {defineStore} from 'pinia';
import {getOrderId} from '../utils';

export type QueryObject<I extends EndpointName = EndpointName> = Record<I, ResolvedQuery<I>>;

export type ResolvedQuery<E extends EndpointName = EndpointName> = E extends EndpointName.FETCH_CONTEXT
  ? ReturnType<typeof useFetchContextQuery>
  : E extends EndpointName.UPDATE_ACCOUNT
  ? ReturnType<typeof useUpdateAccountMutation>
  : E extends EndpointName.EXPORT_ORDERS
  ? ReturnType<typeof useExportOrdersMutation>
  : E extends EndpointName.FETCH_ORDERS
  ? ReturnType<typeof useFetchOrdersQuery>
  : E extends EndpointName.PRINT_ORDERS
  ? ReturnType<typeof usePrintOrdersMutation>
  : E extends EndpointName.UPDATE_ORDERS
  ? ReturnType<typeof useUpdateOrdersMutation>
  : E extends EndpointName.CREATE_RETURN_SHIPMENTS
  ? ReturnType<typeof useCreateReturnShipmentsMutation>
  : E extends EndpointName.DELETE_SHIPMENTS
  ? ReturnType<typeof useDeleteShipmentsMutation>
  : E extends EndpointName.FETCH_SHIPMENTS
  ? ReturnType<typeof useUpdateShipmentsMutation>
  : E extends EndpointName.PRINT_SHIPMENTS
  ? ReturnType<typeof usePrintShipmentsMutation>
  : E extends EndpointName.UPDATE_PLUGIN_SETTINGS
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : E extends EndpointName.UPDATE_PRODUCT_SETTINGS
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : E extends EndpointName.CREATE_WEBHOOKS
  ? ReturnType<typeof useCreateWebhooksMutation>
  : E extends EndpointName.DELETE_WEBHOOKS
  ? ReturnType<typeof useDeleteWebhooksMutation>
  : E extends EndpointName.FETCH_WEBHOOKS
  ? ReturnType<typeof useFetchWebhooksQuery>
  : never;

export const useQueryStore = defineStore('query', () => {
  const queries = ref({} as QueryObject);
  const queryClient: Ref<QueryClient | undefined> = ref<QueryClient>();

  const has = <E extends EndpointName>(key: E): boolean => !!queries.value[key];

  const get = <E extends EndpointName>(key: E): ResolvedQuery<E> => {
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

    // @ts-expect-error todo
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

      register(EndpointName.FETCH_ORDERS, useFetchOrdersQuery(id));

      register(EndpointName.EXPORT_ORDERS, useExportOrdersMutation(mode));
      register(EndpointName.PRINT_ORDERS, usePrintOrdersMutation());
      register(EndpointName.UPDATE_ORDERS, useUpdateOrdersMutation());

      register(EndpointName.DELETE_SHIPMENTS, useDeleteShipmentsMutation());
      register(EndpointName.PRINT_SHIPMENTS, usePrintShipmentsMutation());
      register(EndpointName.FETCH_SHIPMENTS, useUpdateShipmentsMutation());
    },

    queryClient,
  };
});
