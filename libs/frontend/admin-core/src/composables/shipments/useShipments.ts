import {BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {ResolvedQuery} from '../../stores';
import {useShipment} from './useShipment';

export const useShipments = (ids: number[]): ResolvedQuery<`${BackendEndpoint.FetchShipments}.${string}`>[] => {
  return toArray(ids).map((id) => useShipment(id));
};
