import {type ActionParameters, type AnyAdminAction, type MaybeActionResponse, type MaybeAdminAction} from '../../types';
import {createActionContext, createLogger, getActionIdentifier} from '../../services';
import {type ActionContext} from './types';
import {executeAction} from './executeAction';

/**
 * Used to execute the next action in a chain. Propagates the context to the next action.
 */
export const executeNextAction = async <A extends MaybeAdminAction>(
  context: ActionContext,
  nextAction: AnyAdminAction<A>,
  parameters?: ActionParameters<A>,
): Promise<MaybeActionResponse<A>> => {
  const {instance} = context;
  const nextActionIdentifier = getActionIdentifier(nextAction);

  instance.logger.info(`Executing next action: ${nextActionIdentifier}`);

  const newContext: ActionContext<A> = {
    ...context,
    ...createActionContext(nextAction, parameters, {
      ...instance,
      logger: createLogger(`↳ ${nextActionIdentifier}`, instance.logger.level),
    }),
  };

  return executeAction(newContext);
};
