/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointOptions, usePdkApi} from '../../../../sdk';
import {MutationMode, getCallbackForMutationMode, getModalMutationOptions} from '../../../../services';
import {encodeArrayParameter, formToBody} from '../../../../utils';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {fillOrderQueryData} from '../../../../pdk';
import {useModalStore} from '../../../../stores';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useExportOrdersMutation = (mode: MutationMode = MutationMode.DEFAULT) => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.EXPORT_ORDERS,
    async (input) => {
      const pdk = usePdkApi();
      getCallbackForMutationMode(mode)?.();

      const options: EndpointOptions<BackendEndpoint.EXPORT_ORDERS> = {
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
