/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {OneOrMore} from '@myparcel/ts-utils';
import {encodeArrayParameter} from '../../../utils';
import {fillOrderQueryData} from '../../../pdk';
import {usePdkApi} from '../../../sdk';

export interface RefreshShipmentsInput {
  orderIds: OneOrMore<string>;
  shipmentIds?: OneOrMore<number>;
}

export const useRefreshShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, RefreshShipmentsInput>(
    [EndpointName.REFRESH_SHIPMENTS],
    (input) => {
      const sdk = usePdkApi();

      return sdk.refreshShipments({
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
