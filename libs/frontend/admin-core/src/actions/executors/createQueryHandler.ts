import {type UseQueryReturnType} from '@tanstack/vue-query';
import {isOfType} from '@myparcel/ts-utils';
import {useStoreQuery} from '../../composables';
import {type QueryExecutor} from './types';

export const createQueryHandler: QueryExecutor = (endpoint, suffix) => {
  return async (context) => {
    const resolvedSuffix = typeof suffix === 'function' ? suffix(context) : suffix;

    const query = useStoreQuery(endpoint, resolvedSuffix);

    if (!query || !isOfType<UseQueryReturnType<unknown, unknown>>(query, 'refetch')) {
      throw new Error(`Query ${endpoint} not found`);
    }

    await query.refetch();

    // TODO: figure out why data.value isn't working
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return query.data as any;
  };
};
