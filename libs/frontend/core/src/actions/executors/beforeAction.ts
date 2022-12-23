/* eslint-disable no-case-declarations */
import {
  ActionParameters,
  FrontendAction,
  formActions,
  printActions,
  updateOrderActions,
  updateShipmentActions,
} from '../index';
import {beforeFormAction} from './beforeFormAction';
import {beforeOrderAction} from './beforeOrderAction';
import {beforePrintAction} from './beforePrintAction';
import {beforeShipmentAction} from './beforeShipmentAction';
import {isInArray} from '@myparcel/ts-utils';

export const beforeAction = async <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  if (isInArray(action, formActions)) {
    parameters = await beforeFormAction(action, parameters);
  }

  if (isInArray(action, printActions)) {
    parameters = await beforePrintAction(action, parameters);
  }

  if (isInArray(action, updateOrderActions)) {
    parameters = await beforeOrderAction(action, parameters);
  }

  if (isInArray(action, updateShipmentActions)) {
    parameters = await beforeShipmentAction(action, parameters);
  }

  return parameters as ActionParameters<A>;
};
