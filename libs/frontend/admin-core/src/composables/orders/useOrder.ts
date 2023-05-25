import {BackendEndpoint} from '@myparcel-pdk/common';
import {useStoreQuery} from '../useStoreQuery';
import {getOrderId} from '../../utils';
import {ResolvedQuery} from '../../stores';

export const useOrder = (externalIdentifier?: string): ResolvedQuery<`${BackendEndpoint.FetchOrders}.${string}`> => {
  const resolvedExternalIdentifier = externalIdentifier ?? getOrderId();

  if (Array.isArray(resolvedExternalIdentifier)) {
    throw new Error('use useOrders for multiple orders');
  }

  return useStoreQuery(BackendEndpoint.FetchOrders, resolvedExternalIdentifier);
};
