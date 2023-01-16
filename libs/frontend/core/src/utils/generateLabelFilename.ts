import {OneOrMore} from '@myparcel/ts-utils';

export const generateLabelFilename = (parameters: {
  orderIds: OneOrMore<string>;
  shipmentIds?: OneOrMore<number>;
}): string => {
  const prefix = 'myparcel-labels';

  const {orderIds, shipmentIds} = parameters;

  if (Array.isArray(orderIds) && orderIds.length > 1) {
    return prefix;
  }

  if (Array.isArray(shipmentIds) && shipmentIds.length > 1) {
    return `${prefix}-${orderIds[0]}-shipments`;
  }

  if (Array.isArray(shipmentIds) && shipmentIds.length === 1) {
    return `${prefix}-${orderIds[0]}-${shipmentIds[0]}`;
  }

  return `${prefix}-${orderIds[0]}`;
};
