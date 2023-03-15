import {AdminContext, AdminContextKey} from '../types';
import {QueryClient, UseQueryReturnType, useQueryClient} from '@tanstack/vue-query';
import {Ref, ref} from 'vue';
import {
  useCreateWebhooksMutation,
  useDeleteShipmentsMutation,
  useDeleteWebhooksMutation,
  useExportOrdersMutation,
  useExportReturnMutation,
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
import {ApiException} from '@myparcel/sdk';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {MutationMode} from '../services';
import {defineStore} from 'pinia';
import {getOrderId} from '../utils';
import {toArray} from '@myparcel/ts-utils';

export type QueryKey =
  | BackendEndpoint
  | `${BackendEndpoint.FetchContext}.${AdminContextKey}`
  | `${BackendEndpoint.FetchOrders}.${string}`;

export type ContextQuery<C extends AdminContextKey = AdminContextKey.Dynamic> = UseQueryReturnType<
  AdminContext<C>,
  ApiException
>;

export type ResolvedQuery<E extends QueryKey = BackendEndpoint> = E extends BackendEndpoint
  ? EndpointQuery<E>
  : E extends `${BackendEndpoint.FetchOrders}.${infer C}`
  ? C extends string
    ? ReturnType<typeof useFetchOrdersQuery>
    : never
  : E extends `${BackendEndpoint.FetchContext}.${infer C}`
  ? C extends AdminContextKey
    ? ContextQuery<C>
    : never
  : never;

export type QueryObject<I extends QueryKey = BackendEndpoint> = Record<I, ResolvedQuery<I>>;

type EndpointQuery<E extends BackendEndpoint = BackendEndpoint> = E extends BackendEndpoint.FetchContext
  ? ReturnType<typeof useFetchContextQuery>
  : E extends BackendEndpoint.UpdateAccount
  ? ReturnType<typeof useUpdateAccountMutation>
  : E extends BackendEndpoint.ExportOrders
  ? ReturnType<typeof useExportOrdersMutation>
  : E extends BackendEndpoint.FetchOrders
  ? ReturnType<typeof useFetchOrdersQuery>
  : E extends BackendEndpoint.PrintOrders
  ? ReturnType<typeof usePrintOrdersMutation>
  : E extends BackendEndpoint.UpdateOrders
  ? ReturnType<typeof useUpdateOrdersMutation>
  : E extends BackendEndpoint.ExportReturn
  ? ReturnType<typeof useExportReturnMutation>
  : E extends BackendEndpoint.DeleteShipments
  ? ReturnType<typeof useDeleteShipmentsMutation>
  : E extends BackendEndpoint.FetchShipments
  ? ReturnType<typeof useUpdateShipmentsMutation>
  : E extends BackendEndpoint.PrintShipments
  ? ReturnType<typeof usePrintShipmentsMutation>
  : E extends BackendEndpoint.UpdatePluginSettings
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : E extends BackendEndpoint.UpdateProductSettings
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : E extends BackendEndpoint.CreateWebhooks
  ? ReturnType<typeof useCreateWebhooksMutation>
  : E extends BackendEndpoint.DeleteWebhooks
  ? ReturnType<typeof useDeleteWebhooksMutation>
  : E extends BackendEndpoint.FetchWebhooks
  ? ReturnType<typeof useFetchWebhooksQuery>
  : never;

// eslint-disable-next-line max-lines-per-function
export const useQueryStore = defineStore('query', () => {
  const queries = ref({} as QueryObject);
  const queryClient: Ref<QueryClient | undefined> = ref<QueryClient>();

  const has = <E extends QueryKey>(key: E): boolean => {
    // @ts-expect-error todo
    return queries.value[key] !== undefined;
  };

  const get = <E extends QueryKey>(key: E): ResolvedQuery<E> => {
    if (!has(key)) {
      throw new Error(`No query found for key ${key}`);
    }

    // @ts-expect-error todo
    return queries.value[key];
  };

  const register = <E extends QueryKey>(key: E, query: ResolvedQuery<E>): ResolvedQuery<E> => {
    if (!queryClient.value) {
      queryClient.value = useQueryClient();
    }

    // @ts-expect-error todo
    queries.value[key] = query;

    return query;
  };

  return {
    queries,
    get,
    has,

    /**
     * Queries must be registered manually, because vue-query hooks can only be
     * called from a component's setup() function.
     */
    register,

    queryClient,

    /**
     * Register queries needed to render any order related component.
     */
    registerOrderQueries: (orderId?: string | null, mode: MutationMode = MutationMode.Default) => {
      const id = orderId ?? getOrderId();

      if (!id) {
        throw new Error('No order id found');
      }

      toArray(id).forEach((orderId) => {
        register(`${BackendEndpoint.FetchOrders}.${orderId}`, useFetchOrdersQuery(orderId));
      });

      register(BackendEndpoint.FetchOrders, useFetchOrdersQuery());
      register(BackendEndpoint.ExportOrders, useExportOrdersMutation(mode));
      register(BackendEndpoint.PrintOrders, usePrintOrdersMutation());
      register(BackendEndpoint.UpdateOrders, useUpdateOrdersMutation());

      register(BackendEndpoint.DeleteShipments, useDeleteShipmentsMutation());
      register(BackendEndpoint.PrintShipments, usePrintShipmentsMutation());
      register(BackendEndpoint.FetchShipments, useUpdateShipmentsMutation());

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
  };
});
