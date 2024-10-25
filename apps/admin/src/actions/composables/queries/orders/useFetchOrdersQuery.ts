import {type QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {QUERY_KEY_ORDER} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils/encodeArrayParameter';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';
import {fillShipmentsQueryData} from '../../../../pdk/fillShipmentsQueryData';

export const useFetchOrdersQuery = (externalIdentifier?: string): ResolvedQuery<BackendEndpoint.FetchOrders> => {
  const queryKey: QueryKey = [QUERY_KEY_ORDER, ...(externalIdentifier ? [{id: externalIdentifier}] : [])] as const;
  const queryClient = useQueryClient();

  return useQuery(
    queryKey,
    () => {
      const pdk = usePdkAdminApi();

      return pdk.fetchOrders({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          orderIds: encodeArrayParameter(externalIdentifier),
        },
      });
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess: (data) => {
        toArray(data).forEach((order) => {
          fillShipmentsQueryData(queryClient, order.shipments, order);
        });
      },
    },
  );
};
