import {useSettingsStore} from '@myparcel-pdk/frontend-checkout-core/src';

/**
 * Check if the given shipping method is allowed to have delivery options by checking if the name starts with any
 * value in a list of shipping methods.
 *
 * Most of the values in this list will be full shipping method names, with an instance id, but some can't have one.
 * That's the reason we're checking if it starts with this value instead of whether it's equal.
 */
export const shippingMethodHasDeliveryOptions = (shippingMethod: string): boolean => {
  const settings = useSettingsStore();

  return settings.state.allowedShippingMethods.some((method) => shippingMethod?.includes(method));
};