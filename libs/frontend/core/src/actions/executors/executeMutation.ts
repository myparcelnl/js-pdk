import {ActionResponse, FrontendAction, actionEndpointMap} from '../consts';
import {ActionContext} from './types';
import {useQueryStore} from '../../stores';

export function executeMutation<A extends FrontendAction>({
  action,
  parameters,
}: ActionContext): Promise<ActionResponse<A>> {
  const queryStore = useQueryStore();

  const endpoint = actionEndpointMap[action];

  if (!endpoint) {
    throw new Error(`Unknown action: ${action}`);
  }

  if (!queryStore.has(endpoint)) {
    throw new Error(`Query not registered: ${endpoint}`);
  }

  const mutation = queryStore.get(endpoint);

  // @ts-expect-error todo
  return mutation.mutateAsync(parameters);
}
