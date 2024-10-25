import {type AdminContextObject, type AdminInstanceContext} from '../../types/context.types';
import {AdminInstanceContextKey} from '../../data/constants';

/**
 * Creates a context object for the current instance.
 */
export const createInstanceContext = (context: AdminContextObject): Partial<AdminInstanceContext> => {
  const instanceContext: Partial<AdminInstanceContext> = {};

  if (context.orderData?.length === 1) {
    const [order] = context.orderData;

    instanceContext[AdminInstanceContextKey.OrderIdentifier] = order.externalIdentifier;
  }

  if (context.productData?.length === 1) {
    const [product] = context.productData;

    instanceContext[AdminInstanceContextKey.ProductIdentifier] = product.externalIdentifier;
  }

  return instanceContext;
};
