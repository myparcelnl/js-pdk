import {ActionContextWithResponse, ActionResponse, FrontendAction, printActions} from '../index';
import {afterPrintAction} from './afterPrintAction';
import {isInArray} from '@myparcel/ts-utils';

export const afterAction = async <A extends FrontendAction>({
  action,
  parameters,
  response,
  logger,
}: ActionContextWithResponse<A>): Promise<ActionResponse<A>> => {
  if (isInArray(action, printActions)) {
    // @ts-expect-error todo
    response = await afterPrintAction(action, parameters, response);
    logger?.debug(action, 'Modified response', response);
  }

  return Promise.resolve(response);
};
