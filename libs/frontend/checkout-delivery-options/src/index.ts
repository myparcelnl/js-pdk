import {StoreListener, useCheckoutStore} from '@myparcel-pdk/frontend-checkout-core/src';
import {
  showOrHideDeliveryOptions,
  updateDeliveryOptions,
  updateDeliveryOptionsOutput,
  updateHasDeliveryOptions,
} from './listeners';
import {EVENT_UPDATED_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options/src';
import {bootDeliveryOptions} from './utils/bootDeliveryOptions';
import {createDeliveryOptionsStore} from './store';
import {injectHiddenInput} from './utils';

export {PdkDeliveryOptionsEvent} from './types';

/**
 * Initializes the checkout delivery options module.
 */
export const initializeCheckoutDeliveryOptions = (): void => {
  window.MyParcelPdk.stores.deliveryOptions = createDeliveryOptionsStore();

  injectHiddenInput();
  bootDeliveryOptions();

  const checkout = useCheckoutStore();

  checkout.on(StoreListener.Update, updateDeliveryOptions);
  checkout.on(StoreListener.Update, updateHasDeliveryOptions);
  checkout.on(StoreListener.Update, showOrHideDeliveryOptions);

  document.addEventListener(EVENT_UPDATED_DELIVERY_OPTIONS, updateDeliveryOptionsOutput);
};

export {useDeliveryOptionsStore} from './store';
