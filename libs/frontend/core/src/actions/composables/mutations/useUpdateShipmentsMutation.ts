/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {OneOrMore} from '@myparcel/ts-utils';
import {encodeArrayParameter} from '../../../utils';
import {fillOrderQueryData} from '../../../pdk';
import {usePdkApi} from '../../../sdk';

export interface UpdateShipmentsInput {
  orderIds: OneOrMore<string>;
  shipmentIds?: OneOrMore<number>;
}

export const useUpdateShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, UpdateShipmentsInput>(
    [EndpointName.FETCH_SHIPMENTS],
    (input) => {
      const pdk = usePdkApi();

      return pdk.fetchShipments({
        // @ts-expect-error todo
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
          shipmentIds: encodeArrayParameter(input.shipmentIds),
        },
      });
    },
    {
      onSuccess: (data) => {
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
