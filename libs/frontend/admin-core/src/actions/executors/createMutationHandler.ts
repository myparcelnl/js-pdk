import {useStoreQuery} from '../../composables';
import {QueryExecutor} from './types';

export const createMutationHandler: QueryExecutor = (endpoint) => {
  return (context) => {
    const mutation = useStoreQuery(endpoint);

    // @ts-expect-error todo
    return mutation.mutateAsync(context.parameters);
  };
};
