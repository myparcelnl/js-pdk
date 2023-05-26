import {type StoreCallbackUpdate} from '@myparcel-pdk/frontend-checkout-core';
import {deliveryOptionsIsRendered, toggleDeliveryOptions} from '../utils';
import {type DeliveryOptionsStoreState} from '../store';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<DeliveryOptionsStoreState> = (newState, oldState) => {
  if (!deliveryOptionsIsRendered() || newState.enabled === oldState.enabled) {
    return;
  }

  toggleDeliveryOptions(newState.enabled);
};
