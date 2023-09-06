import {computed, type ComputedRef, type Ref, ref, unref} from 'vue';
import {defineStore} from 'pinia';
import {get as vuGet, type MaybeRef} from '@vueuse/core';
import {type QueryClient, useQueryClient} from '@tanstack/vue-query';
import {BACKEND_ENDPOINTS_ORDERS, BACKEND_ENDPOINTS_SHIPMENTS, BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {getOrderId, validateId} from '../utils';
import {AdminContextKey, AdminInstanceContextKey} from '../types';
import {globalLogger, MutationMode} from '../services';
import {useInstanceContext} from '../composables';
import {
  type PlainModifier,
  QUERY_KEY_ORDER,
  QUERY_KEY_SHIPMENT,
  useCreateWebhooksMutation,
  useDeleteShipmentsMutation,
  useDeleteWebhooksMutation,
  useExportOrdersMutation,
  useExportReturnMutation,
  useFetchContextQuery,
  useFetchOrdersQuery,
  useFetchProductsQuery,
  useFetchShipmentsQuery,
  useFetchWebhooksQuery,
  usePrintOrdersMutation,
  usePrintShipmentsMutation,
  useUpdateOrdersMutation,
  useUpdateShipmentsMutation,
} from '../actions';
import {type RegisterQuery, type ResolvedQuery} from './types';
import {createQueryCacheKey} from './createQueryCacheKey';

// eslint-disable-next-line max-lines-per-function
export const useQueryStore = defineStore('query', () => {
  const queries = ref({} as Record<string, ResolvedQuery>);
  const queryClient: Ref<QueryClient | undefined> = ref<QueryClient>();

  const has = <E extends BackendEndpoint>(endpoint: E, modifier?: PlainModifier): boolean => {
    const key = createQueryCacheKey(endpoint, modifier);

    return queries.value[key] !== undefined;
  };

  const get = <E extends BackendEndpoint>(endpoint: E, modifier?: PlainModifier): ResolvedQuery<E> => {
    const key = createQueryCacheKey(endpoint, modifier);

    if (!has(endpoint, modifier)) {
      throw new Error(`No query found for key ${key}`);
    }

    // @ts-expect-error todo
    return queries.value[key];
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

    globalLogger.debug(`Registering query ${key}`);

    // @ts-expect-error todo
    queries.value[key] = query;

    return query;
  };

  const registerShipmentQueries = (
    shipmentIds: MaybeRef<OneOrMore<number>>,
    orderIds?: MaybeRef<OneOrMore<string>>,
  ): void => {
    toArray(validateId(unref(orderIds) ?? getOrderId(), true)).forEach((orderId) => {
      toArray(unref(shipmentIds)).forEach((shipmentId) => {
        register(BackendEndpoint.FetchShipments, shipmentId, useFetchShipmentsQuery(orderId, shipmentId));
        register(BackendEndpoint.DeleteShipments, shipmentId, useDeleteShipmentsMutation(orderId, shipmentId));
        register(BackendEndpoint.PrintShipments, shipmentId, usePrintShipmentsMutation(orderId, shipmentId));
        register(BackendEndpoint.UpdateShipments, shipmentId, useUpdateShipmentsMutation(orderId, shipmentId));
        register(BackendEndpoint.ExportReturn, shipmentId, useExportReturnMutation(orderId, shipmentId));
      });
    });

    register(BackendEndpoint.PrintShipments, usePrintShipmentsMutation());
  };

  const computedWatchers: Record<string, ComputedRef<Record<BackendEndpoint, ResolvedQuery>>> = {};

  const getMatchingQueries = (
    key: string,
    id: number | string,
    list: readonly BackendEndpoint[],
  ): ComputedRef<Record<BackendEndpoint, ResolvedQuery>> => {
    const identifier = `${key}-${id}`;

    if (!computedWatchers[identifier]) {
      computedWatchers[identifier] = computed(() => {
        return list.reduce((acc, endpoint) => {
          if (has(endpoint, id)) {
            acc[endpoint] = get(endpoint, id);
          }

          return acc;
        }, {} as Record<BackendEndpoint, ResolvedQuery>);
      });
    }

    return computedWatchers[identifier];
  };

  return {
    get,
    has,
    register,

    registerShipmentQueries,

    /**
     * Register queries needed to render any order related component.
     */
    registerOrderQueries: (orderId?: string | undefined, mode: MutationMode = MutationMode.Default) => {
      const id = validateId(orderId ?? getOrderId(), true);

      toArray(id).forEach((orderId) => {
        const ordersQuery = register(BackendEndpoint.FetchOrders, orderId, useFetchOrdersQuery(orderId));
        vuGet(ordersQuery.data)?.shipments?.forEach((shipment) => registerShipmentQueries(shipment.id, orderId));
        register(BackendEndpoint.FetchOrders, orderId, useFetchOrdersQuery(orderId));
        register(BackendEndpoint.ExportOrders, orderId, useExportOrdersMutation(orderId, mode));
        register(BackendEndpoint.PrintOrders, orderId, usePrintOrdersMutation(orderId));
        register(BackendEndpoint.UpdateOrders, orderId, useUpdateOrdersMutation(orderId));
      });

      register(BackendEndpoint.PrintOrders, usePrintOrdersMutation());
    },

    registerProductQueries: (productId?: string | undefined) => {
      const id = validateId(productId ?? useInstanceContext(AdminInstanceContextKey.ProductIdentifier), true);

      toArray(id).forEach((productId) => {
        register(BackendEndpoint.FetchProducts, productId, useFetchProductsQuery(productId));
      });
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

    getQueriesForShipment(id: number): ComputedRef<Record<BackendEndpoint, ResolvedQuery>> {
      return getMatchingQueries(QUERY_KEY_SHIPMENT, id, BACKEND_ENDPOINTS_SHIPMENTS);
    },

    getQueriesForOrder(externalIdentifier: string): ComputedRef<Record<BackendEndpoint, ResolvedQuery>> {
      return getMatchingQueries(QUERY_KEY_ORDER, externalIdentifier, BACKEND_ENDPOINTS_ORDERS);
    },

    registerWebhookQueries: () => {
      const fetchWebhooks = register(BackendEndpoint.FetchWebhooks, useFetchWebhooksQuery());
      const createWebhooks = register(BackendEndpoint.CreateWebhooks, useCreateWebhooksMutation());
      const deleteWebhooks = register(BackendEndpoint.DeleteWebhooks, useDeleteWebhooksMutation());

      return {fetchWebhooks, createWebhooks, deleteWebhooks};
    },
  };
});
