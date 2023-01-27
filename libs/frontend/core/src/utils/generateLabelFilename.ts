import {ActionParameters, FrontendAction, PrintAction} from '../actions';
import {isOfType, toArray} from '@myparcel/ts-utils';

export const generateLabelFilename = (parameters: ActionParameters<PrintAction>): string => {
  const prefix = 'myparcel-labels';

  const orderIds = toArray(parameters.orderIds);

  if (orderIds.length > 1) {
    return prefix;
  }

  if (isOfType<ActionParameters<FrontendAction.SHIPMENTS_PRINT>>(parameters, 'shipmentIds')) {
    const shipmentIds = toArray(parameters.shipmentIds);

    if (shipmentIds.length > 1) {
      return `${prefix}-${orderIds[0]}-shipments`;
    }

    if (shipmentIds.length === 1) {
      return `${prefix}-${orderIds[0]}-${shipmentIds[0]}`;
    }
  }

  return `${prefix}-${orderIds[0]}`;
};
