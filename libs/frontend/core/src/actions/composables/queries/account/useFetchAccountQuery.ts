/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {QUERY_KEY_ACCOUNT} from '../queryKeys';
import {usePdkApi} from '../../../../sdk';

export const useFetchAccountQuery = () => {
  const queryClient = useQueryClient();

  return useQuery(
    [QUERY_KEY_ACCOUNT],
    async () => {
      const pdk = usePdkApi();
      const accounts = await pdk.fetchAccount();

      return accounts[0];
    },
    {
      ...queryClient.defaultQueryOptions(),
      refetchOnWindowFocus: false,
    },
  );
};
