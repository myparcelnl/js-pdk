import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {ResolvedQuery} from '../stores';
import {getOrderId} from '../utils';
import {useStoreQuery} from './useStoreQuery';

export const useOrder = (externalIdentifier?: string): ResolvedQuery<`${BackendEndpoint.FetchOrders}.${string}`> => {
  externalIdentifier ??= getOrderId();

  return useStoreQuery(BackendEndpoint.FetchOrders, externalIdentifier);
};
