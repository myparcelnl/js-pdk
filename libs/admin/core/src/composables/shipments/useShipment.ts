import {BackendEndpoint} from '@myparcel-pdk/admin-common';
import {useStoreQuery} from '../useStoreQuery';
import {type ResolvedQuery} from '../../stores';

export const useShipment = (id: number): ResolvedQuery<BackendEndpoint.FetchShipments> => {
  return useStoreQuery(BackendEndpoint.FetchShipments, id.toString());
};
