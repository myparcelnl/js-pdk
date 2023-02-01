import {QueryExecutor} from './types';
import {UseQueryReturnType} from '@tanstack/vue-query';
import {isOfType} from '@myparcel/ts-utils';
import {useStoreQuery} from '../../composables';

export const createQueryFetcher: QueryExecutor = (endpoint, suffix) => {
  return async () => {
    const query = useStoreQuery(endpoint, suffix);

    if (!query || !isOfType<UseQueryReturnType<unknown, unknown>>(query, 'refetch')) {
      throw new Error(`Query ${endpoint} not found`);
    }

    await query.refetch();

    // TODO: figure out why data.value isn't working
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return query.data as any;
  };
};
