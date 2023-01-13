import {ActionResponse, FrontendAction} from '../index';
import {ActionContext} from './types';
import {afterAction} from './afterAction';
import {beforeAction} from './beforeAction';
import {executeAction} from './executeAction';

export const doAction = async <A extends FrontendAction>({
  action,
  parameters,
  instance,
}: ActionContext<A>): Promise<ActionResponse<A>> => {
  const resolvedParameters = await beforeAction<A>({action, parameters, instance});

  instance.logger?.debug({parameters, resolvedParameters});

  const response = await executeAction<A>({action, parameters: resolvedParameters, instance});

  const resolvedResponse = afterAction<A>({action, parameters: resolvedParameters, response, instance});

  instance.logger?.debug({response, resolvedResponse});

  return resolvedResponse;
};
