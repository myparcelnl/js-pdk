import {ActionContextWithResponse, ActionResponse, FrontendAction, doAction, printActions} from '../index';

export const afterPrintAction = async <A extends (typeof printActions)[number]>({
  parameters,
  response,
  logger,
}: ActionContextWithResponse<A>): Promise<ActionResponse<A>> => {
  logger?.debug('Please pretend your pdf was just downloaded or opened. 🚀');
  logger?.debug('Parameters', parameters, response);

  void doAction({action: FrontendAction.ORDERS_UPDATE, parameters: {orderIds: parameters?.orderIds}, logger});

  return Promise.resolve(response);
};
