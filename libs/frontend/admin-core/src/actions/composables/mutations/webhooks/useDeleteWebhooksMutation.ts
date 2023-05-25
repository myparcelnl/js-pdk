/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../orders';
import {usePdkAdminApi} from '../../../../sdk';

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
