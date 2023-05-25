/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../orders';
import {usePdkAdminApi} from '../../../../sdk';

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
