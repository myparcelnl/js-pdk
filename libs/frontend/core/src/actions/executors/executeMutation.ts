import {QueryExecutor} from './types';
import {useStoreQuery} from '../../composables';

export const createMutator: QueryExecutor = (endpoint) => {
  return (context) => {
    const mutation = useStoreQuery(endpoint);

    // @ts-expect-error todo
    return mutation.mutateAsync(context.parameters);
  };
};
