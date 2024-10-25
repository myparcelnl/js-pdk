import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {type BackendEndpointResponse} from '../../types/actions/response.types';
import {type ActionContext} from './types';
import {doMutate} from './doMutate';

export const createHandlerWithParameters = async <E extends BackendEndpoint, Bulk extends boolean = false>(
  args: OneOrMore<number | string>,
  endpoint: E,
  context: ActionContext<E>,
  allowBulk?: Bulk,
): Promise<OneOrMore<BackendEndpointResponse<E>>> => {
  const ids = toArray(args);

  if (!ids.length) {
    throw new Error('No arguments provided');
  }

  if (allowBulk && ids.length > 1) {
    // For bulk actions, don't pass ids to the mutations.
    return doMutate(endpoint, undefined, context);
  }

  if (ids.length === 1) {
    return doMutate(endpoint, ids[0], context);
  }

  return Promise.all(ids.map((id) => doMutate(endpoint, id, context)));
};
