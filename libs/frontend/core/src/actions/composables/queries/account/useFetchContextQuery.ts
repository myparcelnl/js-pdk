/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ContextKey, PdkContext} from '../../../../types';
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {EndpointName} from '@myparcel-pdk/common';
import {encodeArrayParameter} from '../../../../utils';
import {usePdkApi} from '../../../../sdk';

type ContextFetchQueryResponse<C extends ContextKey> = PdkContext<C>;

// @ts-expect-error typescript being pedantic
export const useFetchContextQuery = <C extends ContextKey = ContextKey.DYNAMIC>(contextKey: C = ContextKey.DYNAMIC) => {
  const queryClient = useQueryClient();

  return useQuery<ContextFetchQueryResponse<C>>(
    [EndpointName.FETCH_CONTEXT, contextKey],
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
        queryClient.setQueryData([EndpointName.FETCH_CONTEXT, contextKey], data);
      },
    },
  );
};
