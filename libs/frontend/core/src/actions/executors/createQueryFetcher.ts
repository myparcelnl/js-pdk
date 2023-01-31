import {QueryExecutor} from './types';
import {UseQueryReturnType} from '@tanstack/vue-query';
import {isOfType} from '@myparcel/ts-utils';
import {useQueryStore} from '../../stores';

export const createQueryFetcher: QueryExecutor = (endpoint) => {
  return async () => {
    const queryStore = useQueryStore();
    const query = queryStore.get(endpoint);

    if (!query || !isOfType<UseQueryReturnType<unknown, unknown>>(query, 'refetch')) {
      throw new Error(`Query ${endpoint} not found`);
    }

    await query.refetch();

    // TODO: figure out why data.value isn't working
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return query.data as any;
  };
};
