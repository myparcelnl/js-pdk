/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointOptions, usePdkApi} from '../../../sdk';
import {MutationMode, getCallbackForMutationMode, getModalMutationOptions} from '../../../services';
import {encodeArrayParameter, formToBody} from '../../../utils';
import {EndpointName} from '@myparcel-pdk/common';
import {fillOrderQueryData} from '../../../pdk';
import {useModalStore} from '../../../stores';
import {usePdkMutation} from './usePdkMutation';
import {useQueryClient} from '@tanstack/vue-query';

export const useExportOrdersMutation = (mode: MutationMode = MutationMode.DEFAULT) => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    EndpointName.EXPORT_ORDERS,
    async (input) => {
      const pdk = usePdkApi();
      getCallbackForMutationMode(mode)?.();

      const options: EndpointOptions<EndpointName.EXPORT_ORDERS> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
        },
        body: [formToBody(input.form)],
      };

      // @ts-expect-error custom endpoints are not typed correctly
      return pdk.exportOrders(options);
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
