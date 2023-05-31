import {BackendEndpoint} from '@myparcel-pdk/common';
import {useStoreQuery} from '../useStoreQuery';
import {getOrderId} from '../../utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOrder = (externalIdentifier?: string) => {
  const resolvedExternalIdentifier = externalIdentifier ?? getOrderId();

  if (Array.isArray(resolvedExternalIdentifier)) {
    throw new Error('use useOrders for multiple orders');
  }

  return useStoreQuery(BackendEndpoint.FetchOrders, resolvedExternalIdentifier);
};
