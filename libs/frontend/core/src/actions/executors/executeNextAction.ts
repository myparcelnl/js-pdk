import {ActionParameters, ActionResponse, FrontendAction} from '../consts';
import {createActionContext, getActionIdentifier} from '../../services';
import {ActionContext} from './types';
import {PdkAction} from '../../types';
import {executeAction} from './executeAction';

/**
 * Used to execute the next action in a chain. Propagates the context to the next action.
 */
export const executeNextAction = async <A extends FrontendAction | undefined>(
  context: ActionContext,
  nextAction: PdkAction<A>,
  parameters?: ActionParameters<A>,
): Promise<ActionResponse<A>> => {
  context?.instance?.logger.setScope(`> ${getActionIdentifier(nextAction)}`);

  const newContext: ActionContext<A> = {
    ...context,
    ...createActionContext(nextAction, parameters, context.instance),
  };

  return executeAction(newContext);
};
