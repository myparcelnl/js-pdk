/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {encodeArrayParameter} from '../../../../utils';
import {fillOrderQueryData} from '../../../../pdk';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {usePluginSettings} from '../../../../composables';
import {useQueryClient} from '@tanstack/vue-query';

export const usePrintShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.PrintShipments,
    (input) => {
      const pdk = usePdkAdminApi();
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
      ...queryClient.defaultMutationOptions(),
      onSuccess: (data) => {
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
