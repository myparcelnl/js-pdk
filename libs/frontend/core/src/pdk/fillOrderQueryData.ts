import {OneOrMore, Replace, toArray} from '@myparcel/ts-utils';
import {Plugin, Shipment} from '@myparcel-pdk/common/src';
import {QUERY_KEY_ORDER, QUERY_KEY_SHIPMENT} from '../actions';
import {QueryClient, QueryKey} from '@tanstack/vue-query';
import {globalLogger} from '../services';

export function fillOrderQueryData(
  queryClient: QueryClient,
  orders: OneOrMore<Plugin.ModelContextOrderDataContext>,
): void {
  const orderArray = toArray(orders);

  orderArray.forEach((order) => {
    const orderKey: QueryKey = [QUERY_KEY_ORDER, {id: order.externalIdentifier}] as const;

    fillShipmentsQueryData(queryClient, order.shipments ?? []);

    globalLogger.info('inserting', JSON.stringify(orderKey));

    const newOrder: Replace<Plugin.ModelContextOrderDataContext, 'shipments', {id?: number}[]> = {
      ...order,
      shipments: (order.shipments ?? []).filter((shipment) => !shipment.deleted).map((shipment) => ({id: shipment.id})),
    };

    queryClient.setQueryData(orderKey, newOrder);
  });
}

export const fillShipmentsQueryData = (
  queryClient: QueryClient,
  shipments: OneOrMore<Shipment.ModelShipment>,
): void => {
  const shipmentsArray = toArray(shipments);
  // const invalidatedOrders: string[] = [];

  shipmentsArray.forEach((shipment) => {
    // if (updateOrder ) {
    //   const orderKey: QueryKey = [QUERY_KEY_ORDER, {id: shipment.orderId}];
    //
    //
    //   const existingOrder = queryClient.getQueryData(orderKey) as Plugin.ModelPdkOrder;
    //
    //   if (existingOrder) {
    //     existingOrder.shipments
    //   }
    // }

    const shipmentKey: QueryKey = [QUERY_KEY_SHIPMENT, {id: shipment.id}] as const;

    globalLogger.info('inserting', JSON.stringify(shipmentKey));
    queryClient.setQueryData(shipmentKey, shipment);
  });
};
