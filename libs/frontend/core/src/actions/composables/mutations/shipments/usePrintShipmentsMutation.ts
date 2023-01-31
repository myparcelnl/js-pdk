/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common';
import {encodeArrayParameter} from '../../../../utils';
import {fillOrderQueryData} from '../../../../pdk';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {usePluginSettings} from '../../../../composables';
import {useQueryClient} from '@tanstack/vue-query';

export const usePrintShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    EndpointName.PRINT_SHIPMENTS,
    (input) => {
      const pdk = usePdkApi();
      const pluginSettings = usePluginSettings();

      return pdk.printShipments({
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
