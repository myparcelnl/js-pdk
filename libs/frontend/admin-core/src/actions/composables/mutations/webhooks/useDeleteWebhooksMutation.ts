/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useDeleteWebhooksMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.DeleteWebhooks,
    (input) => usePdkAdminApi().deleteWebhooks({parameters: input}),
    {
      ...queryClient.defaultMutationOptions(),
      onSuccess: (data) => {
        queryClient.setQueryData([BackendEndpoint.FetchWebhooks], data);
      },
    },
  );
};
