import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {BackendEndpoint} from '../../../../data';

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
