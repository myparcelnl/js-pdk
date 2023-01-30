/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common';
import {encodeArrayParameter} from '../../../utils';
import {usePdkApi} from '../../../sdk';
import {usePdkMutation} from './usePdkMutation';
import {usePluginSettings} from '../../../composables';

export const usePrintOrdersMutation = () => {
  return usePdkMutation(EndpointName.PRINT_ORDERS, (input) => {
    const pdk = usePdkApi();
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
