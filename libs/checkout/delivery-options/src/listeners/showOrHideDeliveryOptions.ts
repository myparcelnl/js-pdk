import {type StoreCallbackUpdate} from '@myparcel-pdk/checkout-core';
import {deliveryOptionsIsRendered, toggleDeliveryOptions} from '../utils';
import {type DeliveryOptionsStoreState} from '../store';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<DeliveryOptionsStoreState> = (newState, oldState) => {
  if (!deliveryOptionsIsRendered() || (oldState && newState.enabled === oldState.enabled)) {
    return;
  }

  toggleDeliveryOptions(newState.enabled);
};