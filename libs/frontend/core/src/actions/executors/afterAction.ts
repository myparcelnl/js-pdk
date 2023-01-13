import {ActionContextWithResponse, ActionResponse, FrontendAction, printActions} from '../index';
import {afterPrintAction} from './afterPrintAction';
import {isInArray} from '@myparcel/ts-utils';

export const afterAction = async <A extends FrontendAction>({
  action,
  parameters,
  response,
  instance,
}: ActionContextWithResponse<A>): Promise<ActionResponse<A>> => {
  if (isInArray(action, printActions)) {
    // @ts-expect-error todo
    response = await afterPrintAction({instance, action, parameters, response});

    instance.logger?.debug(action, 'Modified response', response);
  }

  return Promise.resolve(response);
};
