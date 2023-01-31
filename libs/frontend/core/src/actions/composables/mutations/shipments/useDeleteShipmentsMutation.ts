/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {encodeArrayParameter, normalizeOrder} from '../../../../utils';
import {EndpointName} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {useOrderData} from '../../../../composables';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useDeleteShipmentsMutation = () => {
  const queryClient = useQueryClient();
  const pdk = usePdkApi();

  return usePdkMutation(
    EndpointName.DELETE_SHIPMENTS,
    async (input) => {
      const orderIds = toArray(input.orderIds);
      const shipmentIds = toArray(input.shipmentIds);

      orderIds
        .map((orderId) => normalizeOrder(orderId))
        .forEach((order) => {
          const orderData = useOrderData(order.value);
          orderData.deletedShipments.value.push(...shipmentIds);
        });

      return pdk.deleteShipments({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          orderIds: encodeArrayParameter(orderIds),
          shipmentIds: encodeArrayParameter(shipmentIds),
        },
      });
    },
    queryClient.defaultMutationOptions(),
  );
};
