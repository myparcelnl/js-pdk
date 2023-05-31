import {type BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {type ResolvedQuery} from '../../stores';
import {useShipment} from './useShipment';

export const useShipments = (ids: number[]): ResolvedQuery<BackendEndpoint.FetchShipments>[] => {
  return toArray(ids).map((id) => useShipment(id));
};
