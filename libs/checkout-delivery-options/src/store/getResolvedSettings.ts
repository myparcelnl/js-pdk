import {type DeliveryOptionsStoreState} from '../types/store.types';
import {
  type CheckoutDeliveryOptionsSettings,
  type CheckoutDeliveryOptionsSettingsInput,
  DeliveryOptionsMode,
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
