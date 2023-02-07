/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {EndpointName} from '@myparcel-pdk/common/src';
import {EndpointResponse} from '../../../../types';
import {QUERY_KEY_ORDER} from '../queryKeys';
import {encodeArrayParameter} from '../../../../utils';
import {fillOrderQueryData} from '../../../../pdk';
import {usePdkApi} from '../../../../sdk';

export const useFetchOrdersQuery = (externalIdentifier: string) => {
  const queryKey = [QUERY_KEY_ORDER, {id: externalIdentifier}] as const;
  const queryClient = useQueryClient();

  return useQuery<EndpointResponse<EndpointName.FETCH_ORDERS>>(
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
