/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {BackendEndpointResponse} from '../../../../types';
import {QUERY_KEY_ORDER} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils';
import {fillShipmentsQueryData} from '../../../../pdk';
import {toArray} from '@myparcel/ts-utils';
import {usePdkAdminApi} from '../../../../sdk';

export const useFetchOrdersQuery = (externalIdentifier?: string) => {
  const queryKey: QueryKey = [QUERY_KEY_ORDER, ...(externalIdentifier ? [{id: externalIdentifier}] : [])] as const;
  const queryClient = useQueryClient();

  return useQuery<BackendEndpointResponse<BackendEndpoint.FetchOrders>>(
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
