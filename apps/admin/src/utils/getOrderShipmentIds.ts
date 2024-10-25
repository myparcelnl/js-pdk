import {get, isDef} from '@vueuse/core';
import {type OrderIds} from '../types/common.types';
import {useOrdersData} from '../composables/orders/useOrdersData';

export const getOrderShipmentIds = (orderIds: OrderIds): number[] => {
  return useOrdersData(orderIds)
    .map(({order}) => get(order)?.shipments)
    .flat()
    .filter(isDef)
    .map((shipment) => shipment.id);
};
