import {
  type CheckoutDeliveryOptionsSettings,
  type CheckoutDeliveryOptionsSettingsInput,
  DeliveryOptionsMode,
  type DeliveryOptionsStoreState,
} from '../types';

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
