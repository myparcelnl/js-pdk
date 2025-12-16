import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-dev/pdk-common';
import {usePdkMutation} from '../usePdkMutation';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const useDeleteWebhooksMutation = (): ResolvedQuery<BackendEndpoint.DeleteWebhooks> => {
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
