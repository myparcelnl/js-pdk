/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {type QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {type BackendEndpoint, type Shipment} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {QUERY_KEY_SHIPMENT} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils';
import {type BackendEndpointResponse} from '../../../../types';
import {usePdkAdminApi} from '../../../../sdk';
import {fillShipmentsQueryData} from '../../../../pdk';

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
