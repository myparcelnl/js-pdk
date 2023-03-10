/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {AdminContextKey} from '../../../../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {encodeArrayParameter} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';

export const useFetchContextQuery = <C extends AdminContextKey = AdminContextKey.Dynamic>(contextKey?: C) => {
  const queryClient = useQueryClient();

  contextKey ??= AdminContextKey.Dynamic as C;

  return useQuery(
    [BackendEndpoint.FetchContext, contextKey],
    async () => {
      const pdk = usePdkAdminApi();
      const context = await pdk.fetchContext({
        // @ts-expect-error custom endpoints are not typed correctly
        parameters: {
          context: encodeArrayParameter(contextKey),
        },
      });

      // @ts-expect-error get first context item that matches requested context.
      return context[0][contextKey] ?? {};
    },
    {
      ...queryClient.defaultQueryOptions(),
      onSuccess: (data) => {
        queryClient.setQueryData([BackendEndpoint.FetchContext, contextKey], data);
      },
    },
  );
};
