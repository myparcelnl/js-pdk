import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {QUERY_KEY_ORDER, QUERY_KEY_SHIPMENT} from '../composables';
import {QueryClient, QueryKey} from '@tanstack/vue-query';
import {Plugin, logger} from '@myparcel-pdk/common';

export function fillOrderQueryData(queryClient: QueryClient, orders: OneOrMore<Plugin.ModelPdkOrder>): void {
  const orderArray = toArray(orders);

  orderArray.forEach((order) => {
    const orderKey: QueryKey = [QUERY_KEY_ORDER, {id: order.externalIdentifier}];

    logger.info('inserting', orderKey);
    queryClient.setQueryData(orderKey, order);

    order.shipments?.forEach((shipment) => {
      const shipmentKey: QueryKey = [QUERY_KEY_SHIPMENT, {id: shipment.id, orderId: order.externalIdentifier}];

      logger.info('inserting', shipmentKey);
      queryClient.setQueryData(shipmentKey, shipment);
    });
  });
}
