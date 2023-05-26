import {type Plugin} from '@myparcel-pdk/common';
import {type OneOrMore} from '@myparcel/ts-utils';
import {useDemoOrderData} from './useDemoOrderData';

export const useDemoOrder = (orderId: OneOrMore<string>): Plugin.ModelContextOrderDataContext => {
  const order = useDemoOrderData().find((order) => order.externalIdentifier === orderId);

  if (!order) {
    throw new Error(`Order with id "${orderId}" not found`);
  }

  return order;
};
