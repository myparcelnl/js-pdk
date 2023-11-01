import {useStoreQuery} from '../useStoreQuery';
import {getOrderId, validateId} from '../../utils';
import {type ResolvedQuery} from '../../stores';
import {BackendEndpoint} from '../../data';

export const useOrder = (externalIdentifier?: string): ResolvedQuery<BackendEndpoint.FetchOrders> => {
  return useStoreQuery(BackendEndpoint.FetchOrders, validateId(externalIdentifier ?? getOrderId()));
};
