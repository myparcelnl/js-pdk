import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';

export const useFetchWebhooksQuery = (): ResolvedQuery<BackendEndpoint.FetchWebhooks> => {
  const queryKey = [BackendEndpoint.FetchWebhooks] as const;
  const queryClient = useQueryClient();

  return useQuery(
    queryKey,
    () => {
      const pdk = usePdkAdminApi();

      return pdk.fetchWebhooks();
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess: (data) => {
        queryClient.setQueryData(queryKey, data);
      },
    },
  );
};
