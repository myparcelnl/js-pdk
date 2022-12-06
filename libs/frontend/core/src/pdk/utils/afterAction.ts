import {ActionParameters, ActionResponse, PdkAction} from '../../data';

export const afterAction = async <A extends PdkAction>(
  action: A,
  parameters: ActionParameters<A>,
  response: ActionResponse<A>,
): Promise<ActionResponse<A>> => {
  console.log('afterAction', action, response, parameters);

  return response;
};
