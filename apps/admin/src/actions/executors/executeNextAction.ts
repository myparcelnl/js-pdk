import {type AdminContext} from '../../types/context.types';
import {type AnyActionDefinition} from '../../types/actions.types';
import {type MaybeActionResponse} from '../../types/actions/response.types';
import {type ActionParameters} from '../../types/actions/parameters.types';
import {type MaybeAdminAction} from '../../types/actions/actions.types';
import {createLogger} from '../../services/logger';
import {getActionIdentifier} from '../../services/actions/getActionIdentifier';
import {createActionContext} from '../../services/actions/createActionContext';
import {type ActionContextWithResponse} from './types';
import {executeAction} from './executeAction';

/**
 * Used to execute the next action in a chain. Propagates the context to the next action.
 */
export const executeNextAction = async <Next extends MaybeAdminAction, Prev extends MaybeAdminAction>(
  context: ActionContextWithResponse<Prev>,
  nextAction: AnyActionDefinition<Next>,
  parameters?: ActionParameters<Next>,
): Promise<MaybeActionResponse<Next>> => {
  const {instance} = context;
  const nextActionIdentifier = getActionIdentifier(nextAction);

  instance.logger.debug(`Executing next action: ${nextActionIdentifier}`);

  const newContext = {
    ...context,
    ...createActionContext(nextAction, parameters, {
      ...instance,
      logger: createLogger(`↳ ${nextActionIdentifier}`, instance.logger.level),
    }),
  } as AdminContext<Next>;

  return executeAction(newContext);
};
