import {type QueryClient} from '@tanstack/vue-query';
import {type Shipment} from '@myparcel-pdk/common';
import {QUERY_KEY_SHIPMENT} from '../../actions';
import {setQueryData} from './setQueryData';

export const setQueryShipment = (queryClient: QueryClient, shipment: Shipment.ModelShipment): void => {
  setQueryData(queryClient, [QUERY_KEY_SHIPMENT, {id: shipment.id}], shipment);
};
