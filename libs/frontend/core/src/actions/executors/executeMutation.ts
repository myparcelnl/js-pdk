import {ActionResponse, FrontendAction} from '../consts';
import {ActionContext} from './types';
import {EndpointName} from '@myparcel-pdk/common';
import {useQueryStore} from '../../stores';

export function executeMutation<A extends FrontendAction>(
  endpoint: EndpointName,
  context: ActionContext<A>,
): Promise<ActionResponse<A>> {
  const queryStore = useQueryStore();

  if (!queryStore.has(endpoint)) {
    throw new Error(`Query not registered: ${endpoint}`);
  }

  const mutation = queryStore.get(endpoint);

  // @ts-expect-error todo
  return mutation.mutateAsync(context.parameters);
}

type MutationExecutor = (
  endpoint: EndpointName,
) => <A extends FrontendAction>(context: ActionContext<A>) => Promise<ActionResponse<A>>;

export const createMutationExecutor: MutationExecutor = (endpoint) => {
  return (context) => executeMutation(endpoint, context);
};
