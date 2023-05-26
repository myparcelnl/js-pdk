import {get} from '@vueuse/core';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type ResolvedQuery} from '../../stores';
import {useShipments} from './useShipments';

export const useOrderShipments = (
  query: ResolvedQuery<`${BackendEndpoint.FetchOrders}.${string}`>,
): ResolvedQuery<`${BackendEndpoint.FetchShipments}.${string}`>[] => {
  return useShipments(get(query.data)?.shipments?.map((item) => item.id) ?? []);
};
