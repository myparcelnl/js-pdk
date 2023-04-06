/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {EndpointResponse} from '../../../../types';
import {usePdkAdminApi} from '../../../../sdk';

export const useFetchWebhooksQuery = () => {
  const queryKey = [BackendEndpoint.FetchWebhooks] as const;
  const queryClient = useQueryClient();

  return useQuery<EndpointResponse<BackendEndpoint.FetchWebhooks>>(
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
