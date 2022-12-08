/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {Plugin} from '@myparcel-pdk/common';
import {QUERY_KEY_ORDER} from './queryKeys';
import {fillOrderQueryData} from '../../../pdk';
import {usePdkApi} from '../../../sdk';

export const useOrderQuery = (externalIdentifier: string) => {
  const queryKey = [QUERY_KEY_ORDER, {id: externalIdentifier}] as const;
  const queryClient = useQueryClient();

  return useQuery<Plugin.ModelContextOrderDataContext>(
    queryKey,
    () => {
      const sdk = usePdkApi();

      const options = {
        parameters: {
          orderIds: externalIdentifier,
        },
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return sdk.getOrders(options);
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess: (data) => {
        console.log('useOrderQuery', data);
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
