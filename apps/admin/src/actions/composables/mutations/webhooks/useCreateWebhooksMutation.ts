import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {usePdkMutation} from '../usePdkMutation';
import {usePdkAdminApi} from '../../../../sdk';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
