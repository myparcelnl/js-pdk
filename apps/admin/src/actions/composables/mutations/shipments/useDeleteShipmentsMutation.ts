import {type QueryKey, useMutation, useQueryClient} from '@tanstack/vue-query';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {QUERY_KEY_ORDER, QUERY_KEY_SHIPMENT} from '../../queries/queryKeys';
import {setQueryOrder} from '../../../../utils/query/setQueryOrder';
import {encodeArrayParameter} from '../../../../utils/encodeArrayParameter';
import {type BackendEndpointResponse} from '../../../../types/actions/response.types';
import {type ActionInput} from '../../../../types/actions/parameters.types';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';

// eslint-disable-next-line max-lines-per-function
export const useDeleteShipmentsMutation = (
  orderIds?: OneOrMore<string>,
  shipmentIds?: OneOrMore<number>,
): ResolvedQuery<BackendEndpoint.DeleteShipments> => {
  const queryClient = useQueryClient();
  const pdk = usePdkAdminApi();

  return useMutation(
    [QUERY_KEY_SHIPMENT, {orderIds, shipmentIds}],
    async () => {
      return pdk.deleteShipments({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          orderIds: encodeArrayParameter(orderIds),
          shipmentIds: encodeArrayParameter(shipmentIds),
        },
      });
    },
    {
      ...queryClient.defaultMutationOptions(),

      async onMutate(input: ActionInput<BackendEndpoint.DeleteShipments>) {
        const previousValues: {queryKey: QueryKey; value: unknown}[] = [];
        const orderIds = toArray(input.orderIds).map(String);
        const shipmentIds = toArray(input.shipmentIds).map(Number);

        await Promise.all(
          orderIds.map(async (orderId) => {
            const queryKey = [QUERY_KEY_ORDER, {id: orderId}] as const;
            await queryClient.cancelQueries({queryKey});

            const previousOrder = queryClient.getQueryData(
              queryKey,
            ) as BackendEndpointResponse<BackendEndpoint.FetchOrders>;

            previousValues.push({queryKey, value: previousOrder});

            setQueryOrder(queryClient, {
              ...previousOrder,
              shipments: previousOrder.shipments.filter((shipment) => !shipmentIds.includes(shipment.id)),
            });
          }),
        );

        return {previousValues};
      },

      onError(err, item, context) {
        context?.previousValues.forEach(({queryKey, value}) => {
          queryClient.setQueryData(queryKey, value);
        });
      },
    },
  );
};
