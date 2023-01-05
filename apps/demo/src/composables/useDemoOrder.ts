import {Plugin} from '@myparcel-pdk/common';
import {useDemoOrderData} from './useDemoOrderData';

export const useDemoOrder = (orderId: string): Plugin.ModelContextOrderDataContext => {
  const order = useDemoOrderData().find((order) => order.externalIdentifier === orderId);

  if (!order) {
    throw new Error(`Order with id "${orderId}" not found`);
  }

  return order;
};
