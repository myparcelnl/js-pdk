/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {AdminContextKey} from '../../../../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {encodeArrayParameter} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';

export const useFetchContextQuery = <C extends AdminContextKey = AdminContextKey.DYNAMIC>(contextKey?: C) => {
  const queryClient = useQueryClient();

  contextKey ??= AdminContextKey.DYNAMIC as C;

  return useQuery(
    [BackendEndpoint.FETCH_CONTEXT, contextKey],
    async () => {
      const pdk = usePdkAdminApi();
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
