import {ActionParameters, ActionResponse, FrontendAction, printActions} from '../index';
import {afterPrintAction} from './afterPrintAction';
import {isInArray} from '@myparcel/ts-utils';

export const afterAction = async <A extends FrontendAction>(
  action: A,
  parameters: ActionParameters<A>,
  response: ActionResponse<A>,
): Promise<ActionResponse<A>> => {
  if (isInArray(action, printActions)) {
    // @ts-expect-error todo
    response = await afterPrintAction(action, parameters, response);
  }

  return Promise.resolve(response);
};
