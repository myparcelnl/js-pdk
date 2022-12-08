import {ActionParameters, ActionResponse, FrontendAction} from '../data';

export const afterAction = async <A extends FrontendAction>(
  action: A,
  parameters: ActionParameters<A>,
  response: ActionResponse<A>,
): Promise<ActionResponse<A>> => {
  console.log('afterAction', action, response, parameters);

  return Promise.resolve(response);
};
