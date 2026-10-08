import {type StoreCallbackUpdate} from '@myparcel-dev/pdk-checkout-common';
import {debounceUpdateListener} from '../utils/debounceUpdateListener';
import {deliveryOptionsIsRendered, toggleDeliveryOptions} from '../utils';
import {type DeliveryOptionsStoreState} from '../types';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<DeliveryOptionsStoreState> = debounceUpdateListener(
  (newState, oldState) => {
    if (!deliveryOptionsIsRendered() || (oldState && newState.enabled === oldState.enabled)) {
      return;
    }

    toggleDeliveryOptions(newState.enabled);
  },
);
