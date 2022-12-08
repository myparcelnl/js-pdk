/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin, convertDotNotationToObject, encodeArrayParameter} from '@myparcel-pdk/frontend-shared';
import {MutationMode, getCallbackForMutationMode, getOptionsForMutationMode} from '../../services';
import {PdkEndpointDefinition, usePdkApi} from '../../sdk';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {FormInstance} from '@myparcel/vue-form-builder';
import {OneOrMore} from '@myparcel/ts-utils';
import {QUERY_KEY_EXPORT_ORDERS} from '../queries';
import {fillOrderQueryData} from '../../pdk';

type ExportOrderInput = {
  orderIds: OneOrMore<string>;
  print?: boolean;
  form?: FormInstance;
};

export const useExportOrdersMutation = (mode: MutationMode = MutationMode.DEFAULT) => {
  const queryClient = useQueryClient();
  const sdk = usePdkApi();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, ExportOrderInput>(
    [QUERY_KEY_EXPORT_ORDERS],
    async (input) => {
      getCallbackForMutationMode(mode)?.();

      const options: PdkEndpointDefinition<EndpointName.EXPORT_ORDERS> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
          print: String(Number(input?.print ?? false)),
        },
        body: convertDotNotationToObject(input.form?.getValues() ?? {}),
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
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
