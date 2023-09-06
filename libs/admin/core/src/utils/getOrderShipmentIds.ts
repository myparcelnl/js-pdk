import {get, isDef} from '@vueuse/core';
import {type OrderIds} from '@myparcel-pdk/admin-common';
import {useOrdersData} from '../composables';

export const getOrderShipmentIds = (orderIds: OrderIds): number[] => {
  return useOrdersData(orderIds)
    .map(({order}) => get(order)?.shipments)
    .flat()
    .filter(isDef)
    .map((shipment) => shipment.id);
};
