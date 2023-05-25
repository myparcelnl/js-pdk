/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../orders';
import {encodeArrayParameter} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';
import {usePluginSettings} from '../../../../composables';

export const usePrintShipmentsMutation = () => {
  return usePdkMutation(BackendEndpoint.PrintShipments, (input) => {
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
  });
};
