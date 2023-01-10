/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {OneOrMore} from '@myparcel/ts-utils';
import {encodeArrayParameter} from '../../../utils';
import {fillOrderQueryData} from '../../../pdk';
import {usePdkApi} from '../../../sdk';
import {usePluginSettings} from '../../../composables';

export interface PrintOrdersInput {
  orderIds: OneOrMore<string>;
}

export const usePrintOrdersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, PrintOrdersInput>(
    [EndpointName.PRINT_ORDERS],
    (input) => {
      const sdk = usePdkApi();
      const pluginSettings = usePluginSettings();

      return sdk.printOrders({
        // @ts-expect-error todo
        parameters: {
          format: pluginSettings.label.format,
          output: pluginSettings.label.output,
          position: pluginSettings.label.position,
          orderIds: encodeArrayParameter(input.orderIds),
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
