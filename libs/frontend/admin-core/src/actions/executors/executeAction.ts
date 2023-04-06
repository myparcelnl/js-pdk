import {MaybeActionResponse, MaybeAdminAction} from '../../types';
import {ActionContext} from './types';
import {executeAfterHandle} from './executeAfterHandle';
import {executeBeforeHandle} from './executeBeforeHandle';
import {executeHandler} from './executeHandler';

/**
 * Execute an AdminAction.
 */
// eslint-disable-next-line complexity,max-lines-per-function
export const executeAction = async <A extends MaybeAdminAction>(
  context: ActionContext<A>,
): Promise<MaybeActionResponse<A>> => {
  const {instance} = context;
  const startTime = Date.now();

  instance.logger.debug('Start', context);

  const resolvedParameters = await executeBeforeHandle(context);

  // If the action was stopped, return early.
  if (!resolvedParameters) {
    instance.logger.debug('Action canceled');
    return;
  }

  const response = await executeHandler({...context, parameters: resolvedParameters} as ActionContext<A>);

  const resolvedResponse = await executeAfterHandle(context, response);

  instance.logger.debug('Took', Date.now() - startTime, 'ms');

  return resolvedResponse;
};
