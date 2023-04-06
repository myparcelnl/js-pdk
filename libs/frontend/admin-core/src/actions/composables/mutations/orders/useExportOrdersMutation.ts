/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint, Plugin} from '@myparcel-pdk/common/src';
import {EndpointOptions, usePdkAdminApi} from '../../../../sdk';
import {MutationMode, getCallbackForMutationMode, getModalMutationOptions} from '../../../../services';
import {encodeArrayParameter, formToBody} from '../../../../utils';
import {fillShipmentsQueryData} from '../../../../pdk';
import {toArray} from '@myparcel/ts-utils';
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

        (toArray(data) as Plugin.ModelContextOrderDataContext[]).forEach((order) => {
          fillShipmentsQueryData(queryClient, order.shipments.slice(-1), order);
        });

        if (input.form) {
          await input.form?.reset();
        }
      },
    },
  );
};
