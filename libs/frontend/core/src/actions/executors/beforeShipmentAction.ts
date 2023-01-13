import {ActionContext, ActionParameters, FrontendAction} from '../index';

export const beforeShipmentAction = async <A extends FrontendAction>({
  parameters,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  return Promise.resolve(parameters as ActionParameters<A>);
};
