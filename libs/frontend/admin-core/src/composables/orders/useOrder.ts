import {BackendEndpoint} from '@myparcel-pdk/common';
import {useStoreQuery} from '../useStoreQuery';
import {getOrderId, validateOrderId} from '../../utils';
import {type ResolvedQuery} from '../../stores';

export const useOrder = (externalIdentifier?: string): ResolvedQuery<BackendEndpoint.FetchOrders> => {
  return useStoreQuery(BackendEndpoint.FetchOrders, validateOrderId(externalIdentifier ?? getOrderId()));
};
