/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {EndpointOptions, usePdkApi} from '../../../sdk';
import {MutationMode, getCallbackForMutationMode, getModalMutationOptions} from '../../../services';
import {encodeArrayParameter, formToBody} from '../../../utils';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {FormInstance} from '@myparcel/vue-form-builder';
import {OneOrMore} from '@myparcel/ts-utils';
import {fillOrderQueryData} from '../../../pdk';
import {useModalStore} from '../../../stores';

type ExportOrdersInput = {
  orderIds: OneOrMore<string>;
  form?: FormInstance;
};

export const useExportOrdersMutation = (mode: MutationMode = MutationMode.DEFAULT) => {
  const queryClient = useQueryClient();
  const sdk = usePdkApi();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, ExportOrdersInput>(
    [EndpointName.EXPORT_ORDERS],
    async (input) => {
      getCallbackForMutationMode(mode)?.();

      const options: EndpointOptions<EndpointName.EXPORT_ORDERS> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
        },
        body: formToBody(input.form),
      };

      // @ts-expect-error custom endpoints are not typed correctly
      return sdk.exportOrders(options);
    },
    {
      ...queryClient.defaultMutationOptions(),
      ...(mode === MutationMode.MODAL ? getModalMutationOptions() : {}),
      async onSuccess(data, input) {
        useModalStore().close();
        fillOrderQueryData(queryClient, data);
        await input.form?.reset();
      },
    },
  );
};
