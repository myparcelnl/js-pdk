// noinspection JSUnusedGlobalSymbols

import {StoreListener, useCheckoutStore} from '@myparcel-dev/pdk-checkout-common';
import {UPDATED_DELIVERY_OPTIONS} from '@myparcel-dev/delivery-options';
import {type CheckoutDeliveryOptionsSettingsInput} from './types';
import {createDeliveryOptionsStore} from './store';
import {updateDeliveryOptions, updateDeliveryOptionsOutput} from './listeners';
import {initializeHiddenInput} from './init';

/**
 * Initializes the checkout delivery options module.
 */
export const initializeCheckoutDeliveryOptions = (settings?: CheckoutDeliveryOptionsSettingsInput): void => {
  window.MyParcelPdk.stores.deliveryOptions = createDeliveryOptionsStore(settings);

  initializeHiddenInput();

  const checkout = useCheckoutStore();

  void updateDeliveryOptions(checkout.state);

  checkout.on(StoreListener.Update, updateDeliveryOptions);

  document.addEventListener(UPDATED_DELIVERY_OPTIONS, updateDeliveryOptionsOutput);
};
