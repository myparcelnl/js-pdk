import {BackendEndpoint} from '@myparcel-pdk/common';
import {useStoreQuery} from '../useStoreQuery';
import {type ResolvedQuery} from '../../stores/types';

export const useShipment = (id: number): ResolvedQuery<BackendEndpoint.FetchShipments> => {
  return useStoreQuery(BackendEndpoint.FetchShipments, id.toString());
};
