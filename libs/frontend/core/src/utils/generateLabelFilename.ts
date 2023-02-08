import {isOfType, toArray} from '@myparcel/ts-utils';
import {ActionInput} from '../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';

export const generateLabelFilename = (
  parameters: ActionInput<BackendEndpoint.PRINT_SHIPMENTS | BackendEndpoint.PRINT_ORDERS>,
): string => {
  const prefix = 'myparcel-labels';

  const orderIds = toArray(parameters.orderIds);

  if (orderIds.length > 1) {
    return prefix;
  }

  if (isOfType<ActionInput<BackendEndpoint.PRINT_SHIPMENTS>>(parameters, 'shipmentIds')) {
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
