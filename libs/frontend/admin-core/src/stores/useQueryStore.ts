import {type Ref, ref} from 'vue';
import {defineStore} from 'pinia';
import {get as vuGet} from '@vueuse/core';
import {type UseMutationReturnType} from '@tanstack/vue-query/build/lib/useMutation';
import {type QueryClient, type UseQueryReturnType, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {type ApiException} from '@myparcel/sdk';
import {getOrderId} from '../utils';
import {type AdminContext, AdminContextKey, type BackendEndpointResponse, type ActionInput} from '../types';
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
  useUpdateOrdersMutation,
  useUpdateShipmentsMutation,
} from '../actions';

type QueryModifier = string | number;

export type ContextQuery<C extends AdminContextKey = AdminContextKey.Dynamic> = UseQueryReturnType<
  AdminContext<C>,
  ApiException
>;

export type ResolvedQuery<E extends BackendEndpoint = BackendEndpoint> = E extends BackendEndpoint
  ? EndpointQuery<E>
  : never;

type Mutations =
  | BackendEndpoint.CreateWebhooks
  | BackendEndpoint.DeleteShipments
  | BackendEndpoint.DeleteWebhooks
  | BackendEndpoint.ExportOrders
  | BackendEndpoint.ExportReturn
  | BackendEndpoint.PrintOrders
  | BackendEndpoint.PrintShipments
  | BackendEndpoint.UpdateAccount
  | BackendEndpoint.UpdateOrders
  | BackendEndpoint.UpdatePluginSettings
  | BackendEndpoint.UpdateProductSettings
  | BackendEndpoint.UpdateShipments;

type Queries =
  | BackendEndpoint.FetchContext
  | BackendEndpoint.FetchOrders
  | BackendEndpoint.FetchShipments
  | BackendEndpoint.FetchWebhooks;

type EndpointQuery<E extends BackendEndpoint> = E extends Mutations
  ? UseMutationReturnType<BackendEndpointResponse<E>, ApiException, ActionInput<E>, unknown>
  : E extends Queries
  ? UseQueryReturnType<BackendEndpointResponse<E>, ApiException>
  : never;

const createQueryCacheKey = (endpoint: BackendEndpoint, modifier: string | number | undefined): string => {
  return modifier ? `${endpoint}.${modifier}` : endpoint;
};

// eslint-disable-next-line max-lines-per-function
export const useQueryStore = defineStore('query', () => {
  const queries = ref({} as Record<string, ResolvedQuery>);
  const queryClient: Ref<QueryClient | undefined> = ref<QueryClient>();

  const has = (endpoint: BackendEndpoint, modifier?: QueryModifier): boolean => {
    const key = createQueryCacheKey(endpoint, modifier);

    return queries.value[key] !== undefined;
  };

  const get = <E extends BackendEndpoint>(endpoint: E, modifier?: QueryModifier): ResolvedQuery<E> => {
    const key = createQueryCacheKey(endpoint, modifier);

    if (!has(endpoint, modifier)) {
      throw new Error(`No query found for key ${key}`);
    }

    // @ts-expect-error todo
    return queries.value[key];
  };

  type RegisterQuery = {
    <E extends BackendEndpoint, Q extends ResolvedQuery<E> = ResolvedQuery<E>>(endpoint: E, query: Q, arg3?: never): Q;
    <E extends BackendEndpoint, Q extends ResolvedQuery<E> = ResolvedQuery<E>>(
      endpoint: E,
      modifier: QueryModifier,
      query: Q,
    ): Q;
  };

  /**
   * Queries must be registered manually, because vue-query hooks can only be
   * called from a component's setup() function.
   */
  const register: RegisterQuery = (endpoint, arg2, arg3) => {
    if (!queryClient.value) {
      queryClient.value = useQueryClient();
    }

    const hasModifier = typeof arg2 === 'string' || typeof arg2 === 'number';

    const modifier = hasModifier ? arg2 : undefined;
    const query = hasModifier ? arg3 : arg2;

    if (has(endpoint, modifier)) {
      return get(endpoint, modifier);
    }

    const key = createQueryCacheKey(endpoint, modifier);

    // @ts-expect-error todo
    queries.value[key] = query;

    return query;
  };

  const registerShipmentQuery = <I extends number>(id: I) => {
    return register(BackendEndpoint.FetchShipments, id, useFetchShipmentsQuery(id));
  };

  return {
    get,
    has,
    register,

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
        const ordersQuery = register(BackendEndpoint.FetchOrders, orderId, useFetchOrdersQuery(orderId));

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
        register(BackendEndpoint.FetchContext, key, useFetchContextQuery(key));
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
