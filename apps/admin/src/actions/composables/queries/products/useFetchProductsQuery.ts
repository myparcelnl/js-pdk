import {type QueryKey, useQuery, useQueryClient} from '@tanstack/vue-query';
import {type ResolvedQuery} from '../../../../stores';
import {BackendEndpoint} from '../../../../data';

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
