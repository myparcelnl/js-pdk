import {type StoreCallbackUpdate} from '@myparcel-dev/pdk-checkout-common';
import {debounceStoreUpdate} from '../utils/debounceStoreUpdate';
import {deliveryOptionsIsRendered, toggleDeliveryOptions} from '../utils';
import {type DeliveryOptionsStoreState} from '../types';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<DeliveryOptionsStoreState> = debounceStoreUpdate(
  (newState, oldState) => {
    if (!deliveryOptionsIsRendered() || (oldState && newState.enabled === oldState.enabled)) {
      return;
    }

    toggleDeliveryOptions(newState.enabled);
  },
);
