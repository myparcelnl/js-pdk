import {BackendEndpoint} from '@myparcel-pdk/common';
import {useStoreQuery} from '../useStoreQuery';
import {ResolvedQuery} from '../../stores';

export const useShipment = (id: number): ResolvedQuery<`${BackendEndpoint.FetchShipments}.${string}`> => {
  return useStoreQuery(BackendEndpoint.FetchShipments, id.toString());
};
