import {type BackendEndpoint} from '@myparcel-pdk/admin-common';
import {type BackendEndpointResponse} from '../../types';
import {useStoreQuery} from '../../composables';
import {type ActionContext, type QueryModifier} from './types';
import {resolveQuerySuffix} from './resolveQuerySuffix';

export const doMutate = <E extends BackendEndpoint>(
  endpoint: E,
  suffix: QueryModifier<E>,
  context: ActionContext<E>,
): Promise<BackendEndpointResponse<E>> => {
  const mutation = useStoreQuery(endpoint, resolveQuerySuffix(suffix, context as unknown as ActionContext<E>));

  // @ts-expect-error todo
  return mutation.mutateAsync(context.parameters);
};
