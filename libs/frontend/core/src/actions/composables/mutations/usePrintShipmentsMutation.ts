/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {OneOrMore} from '@myparcel/ts-utils';
import {encodeArrayParameter} from '../../../utils';
import {fillOrderQueryData} from '../../../pdk';
import {usePdkApi} from '../../../sdk';
import {usePluginSettings} from '../../../composables';

export interface PrintShipmentsInput {
  orderIds: OneOrMore<string>;
  shipmentIds?: OneOrMore<number>;
}

export const usePrintShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, PrintShipmentsInput>(
    [EndpointName.PRINT_SHIPMENTS],
    (input) => {
      const sdk = usePdkApi();
      const pluginSettings = usePluginSettings();

      return sdk.printShipments({
        // @ts-expect-error todo
        parameters: {
          format: pluginSettings.label.format,
          output: pluginSettings.label.output,
          position: pluginSettings.label.position,
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
