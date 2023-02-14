/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {encodeArrayParameter} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {usePluginSettings} from '../../../../composables';

export const usePrintOrdersMutation = () => {
  return usePdkMutation(BackendEndpoint.PRINT_ORDERS, (input) => {
    const pdk = usePdkAdminApi();
    const pluginSettings = usePluginSettings();

    return pdk.printOrders({
      // @ts-expect-error custom endpoints are not typed correctly
      parameters: {
        format: pluginSettings.label.format,
        output: pluginSettings.label.output,
        position: pluginSettings.label.position,
        orderIds: encodeArrayParameter(input.orderIds),
      },
    });
  });
};
