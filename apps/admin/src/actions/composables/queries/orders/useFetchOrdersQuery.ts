import {type QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {type BackendEndpoint} from '@myparcel-dev/pdk-common';
import {toArray} from '@myparcel-dev/ts-utils';
import {QUERY_KEY_ORDER} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {fillShipmentsQueryData} from '../../../../pdk';

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
