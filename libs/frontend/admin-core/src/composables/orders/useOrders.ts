import {BackendEndpoint} from '@myparcel-pdk/common';
import {ResolvedQuery} from '../../stores';
import {getOrderId} from '../../utils';
import {toArray} from '@myparcel/ts-utils';
import {useOrder} from './useOrder';

export const useOrders = (
  externalIdentifiers?: string[],
): ResolvedQuery<`${BackendEndpoint.FetchOrders}.${string}`>[] => {
  return toArray(externalIdentifiers ?? getOrderId()).map((externalIdentifier) => {
    return useOrder(externalIdentifier);
  });
};
