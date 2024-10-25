import {type BackendQueryEndpoints} from '../../types/actions/endpoints.types';
import {useStoreQuery} from '../../composables/useStoreQuery';
import {type QueryHandler, type QueryModifier} from './types';
import {resolveQuerySuffix} from './resolveQuerySuffix';

export const createQueryHandler = <E extends BackendQueryEndpoints>(
  endpoint: E,
  suffix?: QueryModifier<E>,
): QueryHandler<E> => {
  // @ts-expect-error todo
  return async (context) => {
    const resolvedSuffix = resolveQuerySuffix(suffix, context);
    const query = useStoreQuery(endpoint, resolvedSuffix);

    await query.refetch();

    return query.data;
  };
};
