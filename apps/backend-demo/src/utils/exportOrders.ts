import {type H3Event} from 'h3';
import {getItemsByParameter} from './getItemsByParameter';

export const exportOrders = async (event: H3Event) => {
  const query = getQuery(event);

  if (!query.orderIds) {
    throw new Error('No orderIds provided');
  }

  return getItemsByParameter('orders', query.orderIds);
};
