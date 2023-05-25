import {BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {getOrderId} from '../../utils';
import {ResolvedQuery} from '../../stores';
import {useOrder} from './useOrder';

export const useOrders = (
  externalIdentifiers?: string[],
): ResolvedQuery<`${BackendEndpoint.FetchOrders}.${string}`>[] => {
  return toArray(externalIdentifiers ?? getOrderId()).map((externalIdentifier) => {
    return useOrder(externalIdentifier);
  });
};
