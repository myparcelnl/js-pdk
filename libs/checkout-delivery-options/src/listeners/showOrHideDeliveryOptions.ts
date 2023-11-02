import {type StoreCallbackUpdate} from '@myparcel-pdk/checkout-common';
import {debounce, deliveryOptionsIsRendered, toggleDeliveryOptions} from '../utils';
import {type DeliveryOptionsStoreState} from '../types/store.types';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<DeliveryOptionsStoreState> = debounce(
  (newState, oldState) => {
    if (!deliveryOptionsIsRendered() || (oldState && newState.enabled === oldState.enabled)) {
      return;
    }

    toggleDeliveryOptions(newState.enabled);
  },
);
