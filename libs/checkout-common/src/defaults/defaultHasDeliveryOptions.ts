import {getEnabledShippingMethods} from '../utils';
import {type PdkCheckoutConfig} from '../types';

export const defaultHasDeliveryOptions = ((shippingMethod: string): boolean => {
  const enabledShippingMethods = getEnabledShippingMethods();

  return enabledShippingMethods.some((method) => shippingMethod === method);
}) satisfies PdkCheckoutConfig['hasDeliveryOptions'];
