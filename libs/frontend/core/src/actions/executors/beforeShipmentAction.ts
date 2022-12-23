import {ActionParameters, FrontendAction} from '../index';

export const beforeShipmentAction = async <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  return Promise.resolve(parameters as ActionParameters<A>);
};
