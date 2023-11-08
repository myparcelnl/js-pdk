// noinspection JSUnusedGlobalSymbols

import {EVENT_UPDATED_DELIVERY_OPTIONS} from '@myparcel-pdk/delivery-options';
import {StoreListener, useCheckoutStore} from '@myparcel-pdk/checkout-common';
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

  document.addEventListener(EVENT_UPDATED_DELIVERY_OPTIONS, updateDeliveryOptionsOutput);
};
