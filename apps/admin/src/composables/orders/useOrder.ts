import {BackendEndpoint} from '@myparcel-pdk/common';
import {useStoreQuery} from '../useStoreQuery';
import {validateId} from '../../utils/validateId';
import {getOrderId} from '../../utils/getOrderId';
import {type ResolvedQuery} from '../../stores/types';

export const useOrder = (externalIdentifier?: string): ResolvedQuery<BackendEndpoint.FetchOrders> => {
  return useStoreQuery(BackendEndpoint.FetchOrders, validateId(externalIdentifier ?? getOrderId()));
};
