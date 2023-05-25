/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ActionInput, BackendEndpointResponse} from '../../../../types';
import {QueryKey, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {QUERY_KEY_ORDER} from '../../queries';
import {encodeArrayParameter} from '../../../../utils';
import {setQueryOrder} from '../../../../helpers';
import {toArray} from '@myparcel/ts-utils';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';

// eslint-disable-next-line max-lines-per-function
export const useDeleteShipmentsMutation = () => {
  const queryClient = useQueryClient();
  const pdk = usePdkAdminApi();

  return usePdkMutation(
    BackendEndpoint.DeleteShipments,
    async (input) => {
      const orderIds = toArray(input.orderIds);
      const shipmentIds = toArray(input.shipmentIds);

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
