import {type Ref, ref} from 'vue';
import {defineStore} from 'pinia';
import {get as vuGet} from '@vueuse/core';
import {type QueryClient, type UseQueryReturnType, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {type ApiException} from '@myparcel/sdk';
import {getOrderId} from '../utils';
import {type AdminContext, AdminContextKey} from '../types';
import {MutationMode} from '../services';
import {
  useCreateWebhooksMutation,
  useDeleteShipmentsMutation,
  useDeleteWebhooksMutation,
  useExportOrdersMutation,
  useExportReturnMutation,
  useFetchContextQuery,
  useFetchOrdersQuery,
  useFetchShipmentsQuery,
  useFetchWebhooksQuery,
  usePrintOrdersMutation,
  usePrintShipmentsMutation,
  type useUpdateAccountMutation,
  useUpdateOrdersMutation,
  type useUpdatePluginSettingsMutation,
  useUpdateShipmentsMutation,
} from '../actions';

export type QueryKey =
  | BackendEndpoint
  | `${BackendEndpoint.FetchContext}.${AdminContextKey}`
  | `${BackendEndpoint.FetchOrders}.${string}`
  | `${BackendEndpoint.FetchShipments}.${string}`;

export type ContextQuery<C extends AdminContextKey = AdminContextKey.Dynamic> = UseQueryReturnType<
  AdminContext<C>,
  ApiException
>;

export type ResolvedQuery<K extends QueryKey = QueryKey> = K extends BackendEndpoint
  ? EndpointQuery<K>
  : K extends `${BackendEndpoint.FetchOrders}.${infer C}`
  ? C extends string
    ? ReturnType<typeof useFetchOrdersQuery>
    : never
  : K extends `${BackendEndpoint.FetchShipments}.${infer C}`
  ? C extends string
    ? ReturnType<typeof useFetchShipmentsQuery>
    : never
  : K extends `${BackendEndpoint.FetchContext}.${infer C}`
  ? C extends AdminContextKey
    ? ContextQuery<C>
    : never
  : never;

export type QueryObject<K extends QueryKey = QueryKey> = Record<K, ResolvedQuery<K>>;

type EndpointQuery<E extends BackendEndpoint = BackendEndpoint> = E extends BackendEndpoint.CreateWebhooks
  ? ReturnType<typeof useCreateWebhooksMutation>
  : E extends BackendEndpoint.DeleteShipments
  ? ReturnType<typeof useDeleteShipmentsMutation>
  : E extends BackendEndpoint.DeleteWebhooks
  ? ReturnType<typeof useDeleteWebhooksMutation>
  : E extends BackendEndpoint.ExportOrders
  ? ReturnType<typeof useExportOrdersMutation>
  : E extends BackendEndpoint.ExportReturn
  ? ReturnType<typeof useExportReturnMutation>
  : E extends BackendEndpoint.FetchContext
  ? ReturnType<typeof useFetchContextQuery>
  : E extends BackendEndpoint.FetchOrders
  ? ReturnType<typeof useFetchOrdersQuery>
  : E extends BackendEndpoint.FetchShipments
  ? ReturnType<typeof useFetchShipmentsQuery>
  : E extends BackendEndpoint.FetchWebhooks
  ? ReturnType<typeof useFetchWebhooksQuery>
  : E extends BackendEndpoint.PrintOrders
  ? ReturnType<typeof usePrintOrdersMutation>
  : E extends BackendEndpoint.PrintShipments
  ? ReturnType<typeof usePrintShipmentsMutation>
  : E extends BackendEndpoint.UpdateAccount
  ? ReturnType<typeof useUpdateAccountMutation>
  : E extends BackendEndpoint.UpdateOrders
  ? ReturnType<typeof useUpdateOrdersMutation>
  : E extends BackendEndpoint.UpdatePluginSettings
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : E extends BackendEndpoint.UpdateProductSettings
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : E extends BackendEndpoint.UpdateShipments
  ? ReturnType<typeof useUpdateShipmentsMutation>
  : never;

// eslint-disable-next-line max-lines-per-function
export const useQueryStore = defineStore('query', () => {
  const queries = ref({} as QueryObject);
  const queryClient: Ref<QueryClient | undefined> = ref<QueryClient>();

  const has = <K extends QueryKey>(key: K): boolean => {
    return queries.value[key] !== undefined;
  };

  const get = <K extends QueryKey>(key: K): ResolvedQuery<K> => {
    if (!has(key)) {
      throw new Error(`No query found for key ${key}`);
    }

    // @ts-expect-error todo
    return queries.value[key];
  };

  /**
   * Queries must be registered manually, because vue-query hooks can only be
   * called from a component's setup() function.
   */
  const register = <K extends QueryKey>(key: K, query: ResolvedQuery<K>): ResolvedQuery<K> => {
    if (!queryClient.value) {
      queryClient.value = useQueryClient();
    }

    if (has(key)) {
      // @ts-expect-error todo
      return queries.value[key];
    }

    // @ts-expect-error todo
    queries.value[key] = query;

    return query;
  };

  const registerShipmentQuery = (id: number) => {
    return register(`${BackendEndpoint.FetchShipments}.${id}`, useFetchShipmentsQuery(id));
  };

  return {
    queries,
    get,
    has,
    register,

    queryClient,

    registerShipmentQuery,

    /**
     * Register queries needed to render any order related component.
     */
    registerOrderQueries: (orderId?: string | null, mode: MutationMode = MutationMode.Default) => {
      const id = orderId ?? getOrderId();

      if (!id) {
        throw new Error('No order id found');
      }

      toArray(id).forEach((orderId) => {
        const ordersQuery = register(`${BackendEndpoint.FetchOrders}.${orderId}`, useFetchOrdersQuery(orderId));

        vuGet(ordersQuery.data)?.shipments?.forEach((shipment) => registerShipmentQuery(shipment.id));
      });

      register(BackendEndpoint.FetchOrders, useFetchOrdersQuery());
      register(BackendEndpoint.ExportOrders, useExportOrdersMutation(mode));
      register(BackendEndpoint.PrintOrders, usePrintOrdersMutation());
      register(BackendEndpoint.UpdateOrders, useUpdateOrdersMutation());

      register(BackendEndpoint.DeleteShipments, useDeleteShipmentsMutation());
      register(BackendEndpoint.PrintShipments, usePrintShipmentsMutation());
      register(BackendEndpoint.UpdateShipments, useUpdateShipmentsMutation());

      register(BackendEndpoint.ExportReturn, useExportReturnMutation());
    },

    /**
     * Register context queries. Always includes global and dynamic context.
     */
    registerContextQueries: <C extends Exclude<AdminContextKey, AdminContextKey.Global | AdminContextKey.Dynamic>>(
      ...keys: C[]
    ) => {
      [AdminContextKey.Global, AdminContextKey.Dynamic, ...keys].forEach((key) => {
        const query = useFetchContextQuery(key) as ResolvedQuery<`${BackendEndpoint.FetchContext}.${C}`>;
        register(`${BackendEndpoint.FetchContext}.${key}`, query);
      });
    },

    registerWebhookQueries: () => {
      const fetchWebhooks = register(BackendEndpoint.FetchWebhooks, useFetchWebhooksQuery());
      const createWebhooks = register(BackendEndpoint.CreateWebhooks, useCreateWebhooksMutation());
      const deleteWebhooks = register(BackendEndpoint.DeleteWebhooks, useDeleteWebhooksMutation());

      return {fetchWebhooks, createWebhooks, deleteWebhooks};
    },
  };
});
