import {BackendEndpoint} from '@myparcel-pdk/common';
import {ResolvedQuery} from '../../stores';
import {useStoreQuery} from '../useStoreQuery';

export const useShipment = (id: number): ResolvedQuery<`${BackendEndpoint.FetchShipments}.${string}`> => {
  return useStoreQuery(BackendEndpoint.FetchShipments, id.toString());
};
