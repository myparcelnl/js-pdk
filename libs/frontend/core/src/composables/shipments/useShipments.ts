import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {ResolvedQuery} from '../../stores';
import {toArray} from '@myparcel/ts-utils';
import {useShipment} from './useShipment';

export const useShipments = (
  ids: (number | undefined)[],
): ResolvedQuery<`${BackendEndpoint.FetchShipments}.${string}`>[] => {
  return toArray(ids)
    .filter(Boolean)
    .map((id) => useShipment(id as number));
};
