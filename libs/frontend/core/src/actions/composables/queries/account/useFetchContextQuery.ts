/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {EndpointResponse} from '../../../../types';
import {useContextStore} from '../../../../stores';
import {usePdkApi} from '../../../../sdk';

export const useFetchContextQuery = () => {
  const queryClient = useQueryClient();
  const contextStore = useContextStore();

  return useQuery<EndpointResponse<EndpointName.FETCH_CONTEXT>>(
    [EndpointName.FETCH_CONTEXT],
    async () => {
      const pdk = usePdkApi();
      const context: [Plugin.ModelContextDynamicContext] = await pdk.fetchContext();

      return context[0];
    },
    {
      ...queryClient.defaultQueryOptions(),
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData([EndpointName.FETCH_CONTEXT], data);

        contextStore.addContext({dynamic: data});
      },
    },
  );
};
