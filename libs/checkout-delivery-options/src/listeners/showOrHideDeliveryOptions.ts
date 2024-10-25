import {type StoreCallbackUpdate} from '@myparcel-pdk/checkout-common';
import {toggleDeliveryOptions} from '../utils/toggleDeliveryOptions';
import {deliveryOptionsIsRendered} from '../utils/deliveryOptionsIsRendered';
import {debounce} from '../utils/debounce';
import {type DeliveryOptionsStoreState} from '../types/store.types';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<DeliveryOptionsStoreState> = debounce(
  (newState, oldState) => {
    if (!deliveryOptionsIsRendered() || (oldState && newState.enabled === oldState.enabled)) {
      return;
    }

    toggleDeliveryOptions(newState.enabled);
  },
);
