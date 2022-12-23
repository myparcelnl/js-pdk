/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {EndpointOptions, usePdkApi} from '../../../sdk';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {OneOrMore} from '@myparcel/ts-utils';
import {encodeArrayParameter} from '../../../utils';

type DeleteShipmentsInput = {
  orderIds: OneOrMore<string>;
  shipmentIds: OneOrMore<number>;
};

export const useDeleteShipmentsMutation = () => {
  const queryClient = useQueryClient();
  const sdk = usePdkApi();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, DeleteShipmentsInput>(
    [EndpointName.DELETE_SHIPMENTS],
    (input) => {
      const options: EndpointOptions<EndpointName.DELETE_SHIPMENTS> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
          shipmentIds: encodeArrayParameter(input.shipmentIds),
        },
      };

      // @ts-expect-error custom endpoints are not typed correctly
      return sdk.deleteShipments(options);
    },
    queryClient.defaultMutationOptions(),
  );
};
