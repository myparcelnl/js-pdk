import {CheckoutStoreState, StoreCallbackUpdate} from '@myparcel-pdk/frontend-checkout-core/src';
import {toggleDeliveryOptions} from '../utils';

export const showOrHideDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  if (newState.hasDeliveryOptions === oldState.hasDeliveryOptions) {
    return;
  }

  toggleDeliveryOptions(newState.hasDeliveryOptions);
};
