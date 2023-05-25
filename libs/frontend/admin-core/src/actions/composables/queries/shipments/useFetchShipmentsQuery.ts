/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint, Shipment} from '@myparcel-pdk/common';
import {QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpointResponse} from '../../../../types';
import {QUERY_KEY_SHIPMENT} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils';
import {fillShipmentsQueryData} from '../../../../pdk';
import {toArray} from '@myparcel/ts-utils';
import {usePdkAdminApi} from '../../../../sdk';

export const useFetchShipmentsQuery = (id?: number, orderId?: number) => {
  const queryKey: QueryKey = [QUERY_KEY_SHIPMENT, ...(id ? [{id}] : [])] as const;
  const queryClient = useQueryClient();

  return useQuery<BackendEndpointResponse<BackendEndpoint.FetchShipments>>(
    queryKey,
    async () => {
      const pdk = usePdkAdminApi();

      const orders = (await pdk.fetchOrders({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          orderIds: encodeArrayParameter(orderId),
        },
      })) as BackendEndpointResponse<BackendEndpoint.FetchOrders>;

      const foundShipment = toArray(orders).reduce((acc, order) => {
        const shipment = order.shipments?.find((shipment) => shipment.id === id);

        return shipment ?? acc;
      }, undefined as Shipment.ModelShipment | undefined);

      return foundShipment as Shipment.ModelShipment;
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess(data) {
        fillShipmentsQueryData(queryClient, data);
      },
    },
  );
};
