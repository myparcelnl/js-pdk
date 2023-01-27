/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {ActionResponse, FrontendAction} from '../../consts';
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {QUERY_KEY_ORDER} from './queryKeys';
import {encodeArrayParameter} from '../../../utils';
import {fillOrderQueryData} from '../../../pdk';
import {usePdkApi} from '../../../sdk';

export const useOrderQuery = (externalIdentifier: string) => {
  const queryKey = [QUERY_KEY_ORDER, {id: externalIdentifier}] as const;
  const queryClient = useQueryClient();

  return useQuery<ActionResponse<FrontendAction.ORDERS_FETCH>>(
    queryKey,
    () => {
      const pdk = usePdkApi();

      return pdk.fetchOrders({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          orderIds: encodeArrayParameter(externalIdentifier),
        },
      });
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess: (data) => {
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
