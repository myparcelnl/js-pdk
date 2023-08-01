import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {getOrderId, validateOrderId} from '../../utils';
import {type UseOrderData, useOrderData} from './useOrderData';

export const useOrdersData = (externalIdentifiers?: OneOrMore<string>): UseOrderData[] => {
  const orderIds = validateOrderId(externalIdentifiers ?? getOrderId(), true);

  return toArray(orderIds).map((externalIdentifier) => useOrderData(externalIdentifier));
};
