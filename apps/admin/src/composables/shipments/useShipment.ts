import {useStoreQuery} from '../useStoreQuery';
import {type ResolvedQuery} from '../../stores';
import {BackendEndpoint} from '../../data';

export const useShipment = (id: number): ResolvedQuery<BackendEndpoint.FetchShipments> => {
  return useStoreQuery(BackendEndpoint.FetchShipments, id.toString());
};
