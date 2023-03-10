/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointOptions, usePdkAdminApi} from '../../../../sdk';
import {MutationMode, getCallbackForMutationMode, getModalMutationOptions} from '../../../../services';
import {encodeArrayParameter, formToBody} from '../../../../utils';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {fillOrderQueryData} from '../../../../pdk';
import {useModalStore} from '../../../../stores';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useExportOrdersMutation = (mode: MutationMode = MutationMode.Default) => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.ExportOrders,
    async (input) => {
      const pdk = usePdkAdminApi();
      getCallbackForMutationMode(mode)?.();

      const options: EndpointOptions<BackendEndpoint.ExportOrders> = {
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
      ...(mode === MutationMode.Modal ? getModalMutationOptions() : {}),

      async onSuccess(data, input) {
        useModalStore().close();
        fillOrderQueryData(queryClient, data);

        await input.form?.reset();
      },
    },
  );
};
