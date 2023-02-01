/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {EndpointName} from '@myparcel-pdk/common';
import {EndpointResponse} from '../../../../types';
import {usePdkApi} from '../../../../sdk';

export const useFetchWebhooksQuery = () => {
  const queryKey = [EndpointName.FETCH_WEBHOOKS] as const;
  const queryClient = useQueryClient();

  return useQuery<EndpointResponse<EndpointName.FETCH_WEBHOOKS>>(
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
