/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {EndpointName} from '@myparcel-pdk/common';
import {EndpointResponse} from '../../../../types';
import {QUERY_KEY_CONTEXT} from '../queryKeys';
import {useContextStore} from '../../../../stores';
import {usePdkApi} from '../../../../sdk';

export const useFetchContextQuery = () => {
  const queryClient = useQueryClient();
  const contextStore = useContextStore();

  return useQuery<EndpointResponse<EndpointName.FETCH_CONTEXT>>(
    [QUERY_KEY_CONTEXT],
    async () => {
      const pdk = usePdkApi();

      return pdk.fetchContext();
    },
    {
      ...queryClient.defaultQueryOptions(),
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData([QUERY_KEY_CONTEXT], data);

        console.log('data', data);

        contextStore.addContext(data[0]);
      },
    },
  );
};
