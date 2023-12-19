import {type H3Event} from 'h3';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {getItemsByParameter} from '../../src/utils/getItemsByParameter';
import {getContext} from '../../src/utils/getContext';
import {exportOrders} from "../../src/utils/exportOrders";

const resolveAction = async (event: H3Event): Promise<{key: string; response: Record<string, unknown>[]}> => {
  const query = getQuery(event);

  if (!query.action) {
    throw new Error('No action provided');
  }

  switch (query.action) {
    case BackendEndpoint.FetchOrders:
      return {
        key: 'orders',
        response: await getItemsByParameter('orders', query.orderIds),
      };

    case BackendEndpoint.ExportOrders:
      return {
        key: 'orders',
        response: await exportOrders(event),
      };

    case BackendEndpoint.FetchContext:
      return {
        key: 'context',
        response: await getContext(event),
      };
  }

  throw new Error(`Unknown action: ${query.action}`);
};

export default cachedEventHandler(async (event) => {
  const resolved = await resolveAction(event);

  return {
    data: {
      [resolved.key]: resolved.response,
    },
  };
});
