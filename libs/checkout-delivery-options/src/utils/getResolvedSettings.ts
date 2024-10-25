import {
  type CheckoutDeliveryOptionsSettings,
  type CheckoutDeliveryOptionsSettingsInput,
  DeliveryOptionsMode,
} from '../types/generic.types';
import {defaultUpdateDeliveryOptions} from '../defaults/defaultUpdateDeliveryOptions';
import {defaultGetPackageType} from '../defaults/defaultGetPackageType';

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
