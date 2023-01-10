import {ActionResponse, FrontendAction} from '../index';
import {ActionContext} from './types';
import {afterAction} from './afterAction';
import {beforeAction} from './beforeAction';
import {executeAction} from './executeAction';

export const doAction = async <A extends FrontendAction>({
  action,
  logger,
  parameters,
}: ActionContext<A>): Promise<ActionResponse<A>> => {
  const resolvedParameters = await beforeAction<A>({action, parameters, logger});

  logger?.debug({parameters, resolvedParameters});

  const response = await executeAction<A>({action, parameters: resolvedParameters, logger});

  const resolvedResponse = afterAction<A>({action, parameters: resolvedParameters, response, logger});

  logger?.debug({response, resolvedResponse});

  return resolvedResponse;
};
