import {AdminContext, AdminContextKey} from '../types';
import {QueryClient, UseQueryReturnType, useQueryClient} from '@tanstack/vue-query';
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
import {ApiException} from '@myparcel/sdk';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {MutationMode} from '../services';
import {defineStore} from 'pinia';
import {getOrderId} from '../utils';

export type QueryKey = BackendEndpoint | `${BackendEndpoint.FETCH_CONTEXT}.${AdminContextKey}`;

export type ContextQuery<C extends AdminContextKey = AdminContextKey.DYNAMIC> = UseQueryReturnType<
  AdminContext<C>,
  ApiException
>;

export type ResolvedQuery<E extends QueryKey = BackendEndpoint> = E extends BackendEndpoint
  ? EndpointQuery<E>
  : E extends `${BackendEndpoint.FETCH_CONTEXT}.${infer C}`
  ? C extends AdminContextKey
    ? ContextQuery<C>
    : never
  : never;

export type QueryObject<I extends QueryKey = BackendEndpoint> = Record<I, ResolvedQuery<I>>;

type EndpointQuery<E extends BackendEndpoint = BackendEndpoint> = E extends BackendEndpoint.FETCH_CONTEXT
  ? ReturnType<typeof useFetchContextQuery>
  : E extends BackendEndpoint.UPDATE_ACCOUNT
  ? ReturnType<typeof useUpdateAccountMutation>
  : E extends BackendEndpoint.EXPORT_ORDERS
  ? ReturnType<typeof useExportOrdersMutation>
  : E extends BackendEndpoint.FETCH_ORDERS
  ? ReturnType<typeof useFetchOrdersQuery>
  : E extends BackendEndpoint.PRINT_ORDERS
  ? ReturnType<typeof usePrintOrdersMutation>
  : E extends BackendEndpoint.UPDATE_ORDERS
  ? ReturnType<typeof useUpdateOrdersMutation>
  : E extends BackendEndpoint.CREATE_RETURN_SHIPMENTS
  ? ReturnType<typeof useCreateReturnShipmentsMutation>
  : E extends BackendEndpoint.DELETE_SHIPMENTS
  ? ReturnType<typeof useDeleteShipmentsMutation>
  : E extends BackendEndpoint.FETCH_SHIPMENTS
  ? ReturnType<typeof useUpdateShipmentsMutation>
  : E extends BackendEndpoint.PRINT_SHIPMENTS
  ? ReturnType<typeof usePrintShipmentsMutation>
  : E extends BackendEndpoint.UPDATE_PLUGIN_SETTINGS
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : E extends BackendEndpoint.UPDATE_PRODUCT_SETTINGS
  ? ReturnType<typeof useUpdatePluginSettingsMutation>
  : E extends BackendEndpoint.CREATE_WEBHOOKS
  ? ReturnType<typeof useCreateWebhooksMutation>
  : E extends BackendEndpoint.DELETE_WEBHOOKS
  ? ReturnType<typeof useDeleteWebhooksMutation>
  : E extends BackendEndpoint.FETCH_WEBHOOKS
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
    registerOrderQueries: (orderId?: string | null, mode: MutationMode = MutationMode.DEFAULT) => {
      const id = orderId ?? getOrderId();

      if (!id) {
        throw new Error('No order id found');
      }

      register(BackendEndpoint.FETCH_ORDERS, useFetchOrdersQuery(id));

      register(BackendEndpoint.EXPORT_ORDERS, useExportOrdersMutation(mode));
      register(BackendEndpoint.PRINT_ORDERS, usePrintOrdersMutation());
      register(BackendEndpoint.UPDATE_ORDERS, useUpdateOrdersMutation());

      register(BackendEndpoint.DELETE_SHIPMENTS, useDeleteShipmentsMutation());
      register(BackendEndpoint.PRINT_SHIPMENTS, usePrintShipmentsMutation());
      register(BackendEndpoint.FETCH_SHIPMENTS, useUpdateShipmentsMutation());
    },

    /**
     * Register context queries. Always includes global and dynamic context.
     */
    registerContextQueries: <C extends Exclude<AdminContextKey, AdminContextKey.GLOBAL | AdminContextKey.DYNAMIC>>(
      ...keys: C[]
    ) => {
      [AdminContextKey.GLOBAL, AdminContextKey.DYNAMIC, ...keys].forEach((key) => {
        const query = useFetchContextQuery(key) as ResolvedQuery<`${BackendEndpoint.FETCH_CONTEXT}.${C}`>;
        register(`${BackendEndpoint.FETCH_CONTEXT}.${key}`, query);
      });
    },
  };
});
