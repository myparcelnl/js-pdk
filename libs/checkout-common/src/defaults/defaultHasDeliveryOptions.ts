import {getEnabledShippingMethods} from '../utils/getEnabledShippingMethods';
import {type PdkCheckoutConfig} from '../types/checkout.types';

export const defaultHasDeliveryOptions = ((shippingMethod: string): boolean => {
  const enabledShippingMethods = getEnabledShippingMethods();

  return enabledShippingMethods.some((method) => shippingMethod === method);
}) satisfies PdkCheckoutConfig['hasDeliveryOptions'];
