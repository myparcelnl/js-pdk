import {ActionParameters, ActionResponse, FrontendAction} from '../index';
import {afterAction} from './afterAction';
import {beforeAction} from './beforeAction';
import {executeAction} from './executeAction';
import {useLogger} from '../../composables/useLogger';

export const doAction = async <A extends FrontendAction>(
  action: A,
  parameters?: Partial<ActionParameters<A>>,
): Promise<ActionResponse<A>> => {
  const logger = useLogger();

  logger.debug(action, 'Initial parameters:', parameters);

  const resolvedParameters = await beforeAction<A>(action, parameters);

  logger.debug(action, 'Resolved parameters:', resolvedParameters);

  const response = await executeAction(action, resolvedParameters);

  logger.debug(action, 'Response', response);

  const resolvedResponse = afterAction(action, resolvedParameters, response);

  logger.debug(action, 'Resolved response', resolvedResponse);

  return resolvedResponse;
};
