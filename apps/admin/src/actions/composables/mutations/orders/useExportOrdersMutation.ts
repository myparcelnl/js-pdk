import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {usePdkMutation} from '../usePdkMutation';
import {formToBody} from '../../../../utils/forms/formToBody';
import {encodeArrayParameter} from '../../../../utils/encodeArrayParameter';
import {type BackendEndpointOptions} from '../../../../types/sdk.types';
import {useModalStore} from '../../../../stores/useModalStore';
import {type ResolvedQuery} from '../../../../stores/types';
import {MutationMode} from '../../../../services/mutations/mutationMode';
import {getModalMutationOptions} from '../../../../services/mutations/getModalMutationOptions';
import {getCallbackForMutationMode} from '../../../../services/mutations/getCallbackForMutationMode';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';
import {fillShipmentsQueryData} from '../../../../pdk/fillShipmentsQueryData';

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
