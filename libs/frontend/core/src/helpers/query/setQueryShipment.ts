import {QUERY_KEY_SHIPMENT} from '../../actions';
import {QueryClient} from '@tanstack/vue-query';
import {Shipment} from '@myparcel-pdk/common/src';
import {setQueryData} from './setQueryData';

export const setQueryShipment = (queryClient: QueryClient, shipment: Shipment.ModelShipment): void => {
  setQueryData(queryClient, [QUERY_KEY_SHIPMENT, {id: shipment.id}], shipment);
};
