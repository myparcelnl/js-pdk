/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {type BackendEndpointResponse} from '../../../../types';
import {usePdkAdminApi} from '../../../../sdk';

export const useFetchWebhooksQuery = () => {
  const queryKey = [BackendEndpoint.FetchWebhooks] as const;
  const queryClient = useQueryClient();

  return useQuery<BackendEndpointResponse<BackendEndpoint.FetchWebhooks>>(
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
