import {deliveryOptionsIsRendered, toggleDeliveryOptions} from '../utils';
import {DeliveryOptionsStoreState} from '../store';
import {StoreCallbackUpdate} from '@myparcel-pdk/frontend-checkout-core';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<DeliveryOptionsStoreState> = (newState, oldState) => {
  if (!deliveryOptionsIsRendered() || newState.enabled === oldState.enabled) {
    return;
  }

  toggleDeliveryOptions(newState.enabled);
};
