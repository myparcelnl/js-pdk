import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {ResolvedQuery} from '../../stores';
import {getOrderId} from '../../utils';
import {useStoreQuery} from '../useStoreQuery';

export const useOrder = (externalIdentifier?: string): ResolvedQuery<`${BackendEndpoint.FetchOrders}.${string}`> => {
  const resolvedExternalIdentifier = externalIdentifier ?? getOrderId();

  if (Array.isArray(resolvedExternalIdentifier)) {
    throw new Error('use useOrders for multiple orders');
  }

  return useStoreQuery(BackendEndpoint.FetchOrders, resolvedExternalIdentifier);
};
