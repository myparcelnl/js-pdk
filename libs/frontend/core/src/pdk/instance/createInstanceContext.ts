import {AdminContextObject, AdminInstanceContext, AdminInstanceContextKey} from '../../types';

/**
 * Creates a context object for the current instance.
 */
export const createInstanceContext = (context: AdminContextObject): Partial<AdminInstanceContext> => {
  const instanceContext: Partial<AdminInstanceContext> = {};

  if (context.orderData?.length === 1) {
    const [order] = context.orderData;

    instanceContext[AdminInstanceContextKey.OrderIdentifier] = order.externalIdentifier;
  }

  return instanceContext;
};
