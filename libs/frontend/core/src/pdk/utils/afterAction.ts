import {ActionParameters, ActionResponse, PdkAction} from '../../data';

type AfterAction = <A extends PdkAction>(
  action: A,
  parameters: ActionParameters<A>,
  response: ActionResponse<A>,
) => Promise<ActionResponse<A>>;

export const afterAction: AfterAction = async (action, response, parameters) => {
  console.log('afterAction', action, response, parameters);

  return response;
};
