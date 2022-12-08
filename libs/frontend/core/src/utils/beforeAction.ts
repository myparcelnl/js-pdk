/* eslint-disable no-case-declarations */
import {ActionParameters, FrontendAction, printActions, updateOrderActions, updateShipmentActions} from '../data';
import {getExportContext} from './getExportContext';

const beforePrintAction = <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  // todo: open print modal

  return Promise.resolve(parameters as ActionParameters<A>);
};

const beforeOrderAction = <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  const {orderIds, form} = getExportContext();

  parameters.orderIds = orderIds;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  parameters.form = form;

  return Promise.resolve(parameters as ActionParameters<A>);
};

const beforeShipmentAction = async <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  return Promise.resolve(parameters as ActionParameters<A>);
};

export const beforeAction = async <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  if (printActions.includes(action)) {
    parameters = await beforePrintAction(action, parameters);
  }

  if (updateOrderActions.includes(action)) {
    parameters = await beforeOrderAction(action, parameters);
  }

  if (updateShipmentActions.includes(action)) {
    parameters = await beforeShipmentAction(action, parameters);
  }

  return parameters as ActionParameters<A>;
};
