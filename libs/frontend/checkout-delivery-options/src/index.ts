import {StoreListener, useCheckoutStore} from '@myparcel-pdk/frontend-checkout-core';
import {updateDeliveryOptions, updateDeliveryOptionsOutput} from './listeners';
import {EVENT_UPDATED_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options';
import {createDeliveryOptionsStore} from './store';
import {injectHiddenInput} from './utils';

export {PdkDeliveryOptionsEvent} from './types';

/**
 * Initializes the checkout delivery options module.
 */
export const initializeCheckoutDeliveryOptions = (): void => {
  window.MyParcelPdk.stores.deliveryOptions = createDeliveryOptionsStore();

  injectHiddenInput();

  const checkout = useCheckoutStore();

  void updateDeliveryOptions(checkout.state);

  checkout.on(StoreListener.Update, updateDeliveryOptions);

  document.addEventListener(EVENT_UPDATED_DELIVERY_OPTIONS, updateDeliveryOptionsOutput);
};

export {useDeliveryOptionsStore} from './store';
