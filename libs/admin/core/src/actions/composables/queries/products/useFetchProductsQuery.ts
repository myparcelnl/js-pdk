import {type QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {type ResolvedQuery} from '../../../../stores';

export const useFetchProductsQuery = (externalIdentifier?: string): ResolvedQuery<BackendEndpoint.FetchProducts> => {
  const queryKey: QueryKey = [
    BackendEndpoint.FetchProducts,
    ...(externalIdentifier ? [{id: externalIdentifier}] : []),
  ] as const;

  const queryClient = useQueryClient();

  return useQuery(
    queryKey,
    () => {
      throw new Error('Not implemented');
    },
    queryClient.defaultQueryOptions(),
  );
};
