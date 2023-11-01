import {useQueryClient} from '@tanstack/vue-query';
import {usePdkMutation} from '../usePdkMutation';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {BackendEndpoint} from '../../../../data';

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
