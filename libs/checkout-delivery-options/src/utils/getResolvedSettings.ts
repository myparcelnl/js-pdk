import {
  type CheckoutDeliveryOptionsSettings,
  type CheckoutDeliveryOptionsSettingsInput,
  DeliveryOptionsMode,
} from '../types';
import {defaultGetPackageType, defaultUpdateDeliveryOptions} from '../defaults';

export const getResolvedSettings = (
  settings: CheckoutDeliveryOptionsSettingsInput | undefined,
): CheckoutDeliveryOptionsSettings => {
  return {
    mode: DeliveryOptionsMode.Multi,

    getPackageType: defaultGetPackageType,
    updateDeliveryOptions: defaultUpdateDeliveryOptions,

    ...settings,
  };
};
