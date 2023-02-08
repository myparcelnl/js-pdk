/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {ContextKey} from '../../../../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {encodeArrayParameter} from '../../../../utils';
import {usePdkApi} from '../../../../sdk';

export const useFetchContextQuery = <C extends ContextKey = ContextKey.DYNAMIC>(contextKey?: C) => {
  const queryClient = useQueryClient();

  contextKey ??= ContextKey.DYNAMIC as C;

  return useQuery(
    [BackendEndpoint.FETCH_CONTEXT, contextKey],
    async () => {
      const pdk = usePdkApi();
      const context = await pdk.fetchContext({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          contexts: encodeArrayParameter(contextKey),
        },
      });

      return context[0][contextKey];
    },
    {
      ...queryClient.defaultQueryOptions(),
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        queryClient.setQueryData([BackendEndpoint.FETCH_CONTEXT, contextKey], data);
      },
    },
  );
};
