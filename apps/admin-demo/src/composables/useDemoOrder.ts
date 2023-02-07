import {OneOrMore} from '@myparcel/ts-utils';
import {Plugin} from '@myparcel-pdk/common/src';
import {useDemoOrderData} from './useDemoOrderData';

export const useDemoOrder = (orderId: OneOrMore<string>): Plugin.ModelContextOrderDataContext => {
  const order = useDemoOrderData().find((order) => order.externalIdentifier === orderId);

  if (!order) {
    throw new Error(`Order with id "${orderId}" not found`);
  }

  return order;
};
