import {ActionResponse, FrontendAction} from '../../types';
import {ActionContext} from './types';
import {EndpointName} from '@myparcel-pdk/common';
import {useStoreQuery} from '../../composables';

type MutationExecutor = (
  endpoint: EndpointName,
) => <A extends FrontendAction>(context: ActionContext<A>) => Promise<ActionResponse<A>>;

export const createMutationExecutor: MutationExecutor = (endpoint) => {
  return (context) => {
    const mutation = useStoreQuery(endpoint);

    // @ts-expect-error todo
    return mutation.mutateAsync(context.parameters);
  };
};
