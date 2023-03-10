import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {getItemsByParameter} from '../../src/utils/getItemsByParameter';

const resolveAction = async (
  query: ReturnType<typeof getQuery>,
): Promise<{key: string; response: Record<string, unknown>[]}> => {
  if (!query.action) {
    throw new Error('No action provided');
  }

  switch (query.action) {
    case BackendEndpoint.FetchOrders:
      return {
        key: 'orders',
        response: await getItemsByParameter('orders', query.orderId),
      };

    case BackendEndpoint.FetchContext:
      return {
        key: 'context',
        response: await getItemsByParameter('context', query.context),
      };
  }

  throw new Error(`Unknown action: ${query.action}`);
};

export default cachedEventHandler(async (event) => {
  const query = getQuery(event);

  const resolved = await resolveAction(query);

  return {
    data: {
      [resolved.key]: resolved.response,
    },
  };
});
