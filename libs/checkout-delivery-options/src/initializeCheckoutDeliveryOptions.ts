import {StoreListener, useCheckoutStore} from '@myparcel-pdk/checkout-common';
import {UPDATED_DELIVERY_OPTIONS} from '@myparcel/delivery-options';
import {type CheckoutDeliveryOptionsSettingsInput} from './types/generic.types';
import {createDeliveryOptionsStore} from './store/createDeliveryOptionsStore';
import {updateDeliveryOptionsOutput} from './listeners/updateDeliveryOptionsOutput';
import {updateDeliveryOptions} from './listeners/updateDeliveryOptions';
import {initializeHiddenInput} from './init/initializeHiddenInput';

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
