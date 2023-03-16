/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ActionInput, EndpointResponse} from '../../../../types';
import {QueryKey, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {QUERY_KEY_ORDER} from '../../queries';
import {encodeArrayParameter} from '../../../../utils';
import {setQueryOrder} from '../../../../helpers';
import {toArray} from '@myparcel/ts-utils';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';

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
        const orderIds = toArray(input.orderIds);
        const shipmentIds = toArray(input.shipmentIds);

        await Promise.all(
          orderIds.map(async (orderId) => {
            const queryKey = [QUERY_KEY_ORDER, {id: orderId}] as const;
            await queryClient.cancelQueries({queryKey});

            const previous = queryClient.getQueryData(queryKey) as EndpointResponse<BackendEndpoint.FetchOrders>;

            previousValues.push({queryKey, value: previous});

            setQueryOrder(queryClient, {
              ...previous,
              shipments: previous.shipments.filter((shipment) => !shipmentIds.includes(shipment.id)),
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
