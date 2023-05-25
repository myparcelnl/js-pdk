import {get} from '@vueuse/core';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {ResolvedQuery} from '../../stores';
import {useShipments} from './useShipments';

export const useOrderShipments = (
  query: ResolvedQuery<`${BackendEndpoint.FetchOrders}.${string}`>,
): ResolvedQuery<`${BackendEndpoint.FetchShipments}.${string}`>[] => {
  return useShipments(get(query.data)?.shipments?.map((item) => item.id) ?? []);
};
