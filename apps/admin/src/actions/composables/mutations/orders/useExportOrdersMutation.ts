import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {type OneOrMore, toArray} from '@myparcel-dev/ts-utils';
import {usePdkMutation} from '../usePdkMutation';
import {encodeArrayParameter, formToBody} from '../../../../utils';
import {type BackendEndpointOptions} from '../../../../types';
import {type ResolvedQuery, useModalStore} from '../../../../stores';
import {getCallbackForMutationMode, getModalMutationOptions, MutationMode} from '../../../../services';
import {usePdkAdminApi} from '../../../../sdk';
import {fillShipmentsQueryData} from '../../../../pdk';

export const useExportOrdersMutation = (
  orderIds?: OneOrMore<string>,
  mode: MutationMode = MutationMode.Default,
): ResolvedQuery<BackendEndpoint.ExportOrders> => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.ExportOrders,
    async (input) => {
      const pdk = usePdkAdminApi();
      getCallbackForMutationMode(mode)?.();

      const options: BackendEndpointOptions<BackendEndpoint.ExportOrders> = {
        parameters: {
          orderIds: encodeArrayParameter(orderIds),
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

        toArray(data).forEach((order) => {
          fillShipmentsQueryData(queryClient, order.shipments?.slice(-1) ?? [], order);
        });

        if (input.form) {
          await input.form?.reset();
        }
      },
    },
  );
};
