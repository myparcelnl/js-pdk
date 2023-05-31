import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../usePdkMutation';
import {encodeArrayParameter} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {usePluginSettings} from '../../../../composables';

export const usePrintShipmentsMutation = (): ResolvedQuery<BackendEndpoint.PrintShipments> => {
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
