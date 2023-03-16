/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint, Shipment} from '@myparcel-pdk/common/src';
import {QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {EndpointResponse} from '../../../../types';
import {QUERY_KEY_SHIPMENT} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils';
import {fillShipmentsQueryData} from '../../../../pdk';
import {usePdkAdminApi} from '../../../../sdk';

export const useFetchShipmentsQuery = (id?: number) => {
  const queryKey: QueryKey = [QUERY_KEY_SHIPMENT, ...(id ? [{id}] : [])] as const;
  const queryClient = useQueryClient();

  return useQuery<EndpointResponse<BackendEndpoint.FetchShipments>>(
    queryKey,
    async () => {
      const pdk = usePdkAdminApi();

      const order = (await pdk.fetchOrders({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          orderIds: encodeArrayParameter(id),
        },
      })) as EndpointResponse<BackendEndpoint.FetchOrders>;

      return order.shipments?.find((shipment) => shipment.id === id) ?? ({} as Shipment.ModelShipment);
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess: (data) => {
        fillShipmentsQueryData(queryClient, data);
      },
    },
  );
};
