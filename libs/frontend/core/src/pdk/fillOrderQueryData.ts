import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {QUERY_KEY_ORDER, QUERY_KEY_SHIPMENT} from '../actions';
import {QueryClient, QueryKey} from '@tanstack/vue-query';
import {Plugin} from '@myparcel-pdk/common';
import {globalLogger} from '../services';

export function fillOrderQueryData(queryClient: QueryClient, orders: OneOrMore<Plugin.ModelPdkOrder>): void {
  const orderArray = toArray(orders);

  orderArray.forEach((order) => {
    const orderKey: QueryKey = [QUERY_KEY_ORDER, {id: order.externalIdentifier}];

    globalLogger.info('inserting', JSON.stringify(orderKey));
    queryClient.setQueryData(orderKey, order);

    order.shipments?.forEach((shipment) => {
      const shipmentKey: QueryKey = [QUERY_KEY_SHIPMENT, {id: shipment.id, orderId: order.externalIdentifier}];

      globalLogger.info('inserting', JSON.stringify(shipmentKey));
      queryClient.setQueryData(shipmentKey, shipment);
    });
  });
}
