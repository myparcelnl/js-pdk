import {type OneOrMore, toArray} from '@myparcel-dev/ts-utils';
import {getOrderId, validateId} from '../../utils';
import {type UseOrderData, useOrderData} from './useOrderData';

export const useOrdersData = (externalIdentifiers?: OneOrMore<string>): UseOrderData[] => {
  try {
    const orderIds = validateId(externalIdentifiers ?? getOrderId(), true);
    return toArray(orderIds).map((externalIdentifier) => useOrderData(externalIdentifier));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return [];
  }
};
