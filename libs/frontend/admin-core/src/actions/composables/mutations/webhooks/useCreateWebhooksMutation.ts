/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useCreateWebhooksMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.CreateWebhooks,
    (input) => usePdkAdminApi().createWebhooks({parameters: input}),
    {
      ...queryClient.defaultMutationOptions(),
      onSuccess: (data) => {
        queryClient.setQueryData([BackendEndpoint.FetchWebhooks], data);
      },
    },
  );
};
