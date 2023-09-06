import {type QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {type BackendEndpoint, type Shipment} from '@myparcel-pdk/common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {QUERY_KEY_SHIPMENT} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils';
import {type BackendEndpointResponse} from '../../../../types';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {fillShipmentsQueryData} from '../../../../pdk';

export const useFetchShipmentsQuery = <I extends number>(
  orderIds?: OneOrMore<string>,
  shipmentIds?: I,
): ResolvedQuery<BackendEndpoint.FetchShipments> => {
  const queryKey: QueryKey = [QUERY_KEY_SHIPMENT, ...(shipmentIds ? [{id: shipmentIds}] : [])] as const;
  const queryClient = useQueryClient();

  return useQuery(
    queryKey,
    async () => {
      const pdk = usePdkAdminApi();

      const orders = (await pdk.fetchOrders({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          orderIds: encodeArrayParameter(orderIds),
        },
      })) as BackendEndpointResponse<BackendEndpoint.FetchOrders>;

      const foundShipment = toArray(orders).reduce((acc, order) => {
        const shipment = order.shipments?.find((shipment) => shipment.id === shipmentIds);

        return shipment ?? acc;
      }, undefined as Shipment.ModelShipment | undefined);

      return foundShipment as BackendEndpointResponse<BackendEndpoint.FetchShipments>;
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess(data) {
        fillShipmentsQueryData(queryClient, data);
      },
    },
  );
};
