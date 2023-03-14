import {ActionParameters, ActionResponse, AdminAction, AnyAdminAction} from '../../types';
import {createActionContext, getActionIdentifier} from '../../services';
import {ActionContext} from './types';
import {executeAction} from './executeAction';

/**
 * Used to execute the next action in a chain. Propagates the context to the next action.
 */
export const executeNextAction = async <A extends AdminAction | undefined>(
  context: ActionContext,
  nextAction: AnyAdminAction<A>,
  parameters?: ActionParameters<A>,
): Promise<ActionResponse<A> | undefined> => {
  const nextActionIdentifier = getActionIdentifier(nextAction);

  context.instance?.logger.info(`Executing next action: ${nextActionIdentifier}`);
  context?.instance?.logger.setScope(`↳ ${nextActionIdentifier}`);

  const newContext: ActionContext<A> = {
    ...context,
    ...createActionContext(nextAction, parameters, context.instance),
  };

  return executeAction(newContext);
};
