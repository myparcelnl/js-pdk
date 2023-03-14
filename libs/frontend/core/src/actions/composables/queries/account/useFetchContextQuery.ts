/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {AdminView, BackendEndpoint} from '@myparcel-pdk/common/src';
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {AdminContextKey} from '../../../../types';
import {encodeArrayParameter} from '../../../../utils';
import {useAdminInstance} from '../../../../composables';
import {usePdkAdminApi} from '../../../../sdk';

export const useFetchContextQuery = <C extends AdminContextKey = AdminContextKey.Dynamic>(contextKey?: C) => {
  const queryClient = useQueryClient();
  const adminInstance = useAdminInstance();

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
      // Refetch dynamic context on window focus if the current view is not the plugin settings view.
      refetchOnWindowFocus: (query) => {
        return adminInstance.view !== AdminView.PluginSettings && query.queryKey[1] === AdminContextKey.Dynamic
          ? 'always'
          : false;
      },
      onSuccess: (data) => {
        queryClient.setQueryData([BackendEndpoint.FetchContext, contextKey], data);
      },
    },
  );
};
