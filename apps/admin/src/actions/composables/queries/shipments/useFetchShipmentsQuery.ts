import {type QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {type BackendEndpoint, type Shipment} from '@myparcel-pdk/common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {QUERY_KEY_SHIPMENT} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils/encodeArrayParameter';
import {type BackendEndpointResponse} from '../../../../types/actions/response.types';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';
import {fillShipmentsQueryData} from '../../../../pdk/fillShipmentsQueryData';

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

      return toArray(orders).reduce((acc, order) => {
        const shipment = order.shipments?.find((shipment) => shipment.id === shipmentIds);

        return shipment ?? acc;
      }, undefined as Shipment.ModelShipment | undefined);
    },
    // @ts-expect-error todo
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess(data) {
        fillShipmentsQueryData(queryClient, data);
      },
    },
  );
};
