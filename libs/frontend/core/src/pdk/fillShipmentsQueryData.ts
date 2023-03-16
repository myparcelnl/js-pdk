import {OneOrMore, toArray} from '@myparcel/ts-utils';
import {Plugin, Shipment} from '@myparcel-pdk/common/src';
import {setQueryOrder, setQueryShipment} from '../helpers';
import {QUERY_KEY_ORDER} from '../actions';
import {QueryClient} from '@tanstack/vue-query';

export const fillShipmentsQueryData = (
  queryClient: QueryClient,
  shipments: OneOrMore<Shipment.ModelShipment>,
  order?: Plugin.ModelPdkOrder,
): void => {
  const shipmentsArray = toArray(shipments);
  const orderIds = new Set(shipmentsArray.map((shipment) => shipment.orderId));

  orderIds.forEach((orderId) => {
    let newOrder = order;

    if (!newOrder) {
      const queryOrder = queryClient.getQueryData([QUERY_KEY_ORDER, {id: orderId}]) as Plugin.ModelPdkOrder;

      if (!queryOrder) {
        return;
      }

      newOrder = {
        ...queryOrder,
        shipments: queryOrder.shipments.map((shipment) => ({
          ...shipment,
          updated: shipmentsArray.find((item) => item.id === shipment.id)?.updated ?? shipment.updated,
        })),
      };
    }

    setQueryOrder(queryClient, newOrder);
  });
  shipmentsArray.forEach((shipment) => {
    setQueryShipment(queryClient, shipment);
  });
};
