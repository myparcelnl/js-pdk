import {
  type CheckoutDeliveryOptionsSettings,
  type CheckoutDeliveryOptionsSettingsInput,
  DeliveryOptionsMode,
} from '../types';
import {type DeliveryOptionsStoreState} from './createDeliveryOptionsStore';

export const getResolvedSettings = (
  settings: CheckoutDeliveryOptionsSettingsInput | undefined,
): CheckoutDeliveryOptionsSettings => {
  return {
    mode: DeliveryOptionsMode.Multi,
    updateDeliveryOptions(state: DeliveryOptionsStoreState) {
      return state.configuration.config;
    },
    ...settings,
  };
};
