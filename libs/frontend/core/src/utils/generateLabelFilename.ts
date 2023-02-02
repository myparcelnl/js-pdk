import {isOfType, toArray} from '@myparcel/ts-utils';
import {ActionInput} from '../types';
import {EndpointName} from '@myparcel-pdk/common';

export const generateLabelFilename = (
  parameters: ActionInput<EndpointName.PRINT_SHIPMENTS | EndpointName.PRINT_ORDERS>,
): string => {
  const prefix = 'myparcel-labels';

  const orderIds = toArray(parameters.orderIds);

  if (orderIds.length > 1) {
    return prefix;
  }

  if (isOfType<ActionInput<EndpointName.PRINT_SHIPMENTS>>(parameters, 'shipmentIds')) {
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
