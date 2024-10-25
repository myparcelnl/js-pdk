import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {AdminContextKey, BackendEndpoint} from '@myparcel-pdk/common';
import {encodeArrayParameter} from '../../../../utils/encodeArrayParameter';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';
import {AdminView} from '../../../../data/view';
import {useAdminInstance} from '../../../../composables/useAdminInstance';

export const useFetchContextQuery = <C extends AdminContextKey = AdminContextKey.Dynamic>(
  contextKey?: C,
): ResolvedQuery<BackendEndpoint.FetchContext> => {
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
