import {InstanceContextKey, PdkContextObject, PdkInstanceContext} from '../../types';

/**
 * Creates a context object for the current instance.
 */
export const createInstanceContext = (context: PdkContextObject): Partial<PdkInstanceContext> => {
  const instanceContext: Partial<PdkInstanceContext> = {};

  if (context.orderData?.length === 1) {
    const [order] = context.orderData;

    instanceContext[InstanceContextKey.ORDER_IDENTIFIER] = order.externalIdentifier;
  }

  return instanceContext;
};
