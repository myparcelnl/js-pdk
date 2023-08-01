import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {type BackendEndpointResponse} from '../../types';
import {type ActionContext} from './types';
import {doMutate} from './doMutate';

export const createHandlerWithParameters = <E extends BackendEndpoint>(
  args: OneOrMore<number | string>,
  endpoint: E,
  context: ActionContext<E>,
): Promise<BackendEndpointResponse<E>[]> => {
  const ids = toArray(args);

  if (!ids.length) {
    throw new Error('No arguments provided');
  }

  return Promise.all(ids.map((id) => doMutate(endpoint, id, context)));
};
