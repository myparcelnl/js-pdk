/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {MutationMode, getCallbackForMutationMode, getOptionsForMutationMode} from '../../services';
import {PdkEndpointDefinition, usePdkApi} from '../../sdk';
import {QUERY_KEY_ORDER, QUERY_KEY_SHIPMENT} from './queryKeys';
import {convertDotNotationToObject, encodeArrayParameter} from '@myparcel-pdk/frontend-shared';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';

type ExportOrderInput = {
  orderIds: string | string[];
  print?: boolean;
  data: Partial<Plugin.ModelContextOrderDataContext>;
};

export const useExportOrdersQuery = (mode: MutationMode = MutationMode.DEFAULT) => {
  const queryClient = useQueryClient();
  const sdk = usePdkApi();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, ExportOrderInput>(
    ['exportOrder'],
    async (input) => {
      getCallbackForMutationMode(mode)?.();

      const options: PdkEndpointDefinition<EndpointName.EXPORT_ORDERS> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
          print: String(Number(input?.print ?? false)),
        },
        body: convertDotNotationToObject(input.data),
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return sdk.exportOrders(options);
    },
    {
      ...queryClient.defaultMutationOptions(),
      ...getOptionsForMutationMode(mode),
      onSuccess: (data) => {
        console.log('onSuccess', data);
        data.forEach((order) => {
          queryClient.setQueryData([QUERY_KEY_ORDER, order.externalIdentifier], order);

          order.shipments?.forEach((shipment) => {
            queryClient.setQueryData(
              [QUERY_KEY_ORDER, order.externalIdentifier, QUERY_KEY_SHIPMENT, shipment.externalIdentifier],
              shipment,
            );
          });
        });
      },
    },
  );
};
