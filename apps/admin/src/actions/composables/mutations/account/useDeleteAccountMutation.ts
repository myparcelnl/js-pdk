import {useQueryClient} from '@tanstack/vue-query';
import {AdminContextKey, BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../usePdkMutation';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const useDeleteAccountMutation = (): ResolvedQuery<BackendEndpoint.DeleteAccount> => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.DeleteAccount,
    async () => {
      const pdk = usePdkAdminApi();

      const context = await pdk.deleteAccount();

      return context[0];
    },
    {
      ...queryClient.defaultMutationOptions(),

      onSuccess(data) {
        queryClient.setQueryData(
          [BackendEndpoint.FetchContext, AdminContextKey.Dynamic],
          data[AdminContextKey.Dynamic],
        );
      },
    },
  );
};
