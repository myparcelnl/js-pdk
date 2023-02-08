/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {EndpointResponse} from '../../../../types';
import {usePdkApi} from '../../../../sdk';

export const useFetchWebhooksQuery = () => {
  const queryKey = [BackendEndpoint.FETCH_WEBHOOKS] as const;
  const queryClient = useQueryClient();

  return useQuery<EndpointResponse<BackendEndpoint.FETCH_WEBHOOKS>>(
    queryKey,
    () => {
      const pdk = usePdkApi();

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
