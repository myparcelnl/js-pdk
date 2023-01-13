import {ActionContextWithResponse, ActionResponse, FrontendAction, doAction, printActions} from '../index';

export const afterPrintAction = async <A extends (typeof printActions)[number]>({
  parameters,
  response,
  instance,
}: ActionContextWithResponse<A>): Promise<ActionResponse<A>> => {
  instance.logger?.debug('Please pretend your pdf was just downloaded or opened. 🚀');
  instance.logger?.debug('Parameters', parameters, response);

  void doAction({action: FrontendAction.ORDERS_UPDATE, parameters: {orderIds: parameters?.orderIds}, instance});

  return Promise.resolve(response);
};
