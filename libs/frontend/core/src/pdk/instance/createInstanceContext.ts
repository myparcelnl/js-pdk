import {InstanceContextKey, PdkContextObject, PdkInstanceContext} from '../../types';
import {useContextStore} from '../../stores';

/**
 * Creates a context object for the current instance.
 */
export const createInstanceContext = (context: PdkContextObject): PdkInstanceContext => {
  const contextStore = useContextStore();

  const instanceContext: PdkInstanceContext = {};

  if (context.orderData?.length) {
    const [order] = context.orderData;

    instanceContext[InstanceContextKey.ORDER_IDENTIFIER] = order.externalIdentifier;

    contextStore.addContext(instanceContext);
  }

  return instanceContext;
};
