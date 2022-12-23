/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {Plugin} from '@myparcel-pdk/common';
import {QUERY_KEY_ORDER} from './queryKeys';
import {encodeArrayParameter} from '../../../utils';
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
          orderIds: encodeArrayParameter(externalIdentifier),
        },
      };

      // @ts-expect-error custom endpoints are not typed correctly
      return sdk.getOrders(options);
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess: (data) => {
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
