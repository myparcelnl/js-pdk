/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {usePdkApi} from '../../../sdk';
import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {encodeArrayParameter, normalizeOrder} from '../../../utils';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {useOrderData} from '../../../composables';

type DeleteShipmentsInput = {
  orderIds: OneOrMore<string>;
  shipmentIds: OneOrMore<number>;
};

export const useDeleteShipmentsMutation = () => {
  const queryClient = useQueryClient();
  const pdk = usePdkApi();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, DeleteShipmentsInput>(
    [EndpointName.DELETE_SHIPMENTS],
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
