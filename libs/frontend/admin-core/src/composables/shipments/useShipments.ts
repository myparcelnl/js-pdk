import {BackendEndpoint} from '@myparcel-pdk/common';
import {ResolvedQuery} from '../../stores';
import {toArray} from '@myparcel/ts-utils';
import {useShipment} from './useShipment';

export const useShipments = (ids: number[]): ResolvedQuery<`${BackendEndpoint.FetchShipments}.${string}`>[] => {
  return toArray(ids).map((id) => useShipment(id));
};
