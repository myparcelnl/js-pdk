import {StoreListener, useCheckoutStore} from '@myparcel-pdk/frontend-checkout-core/src';
import {createDeliveryOptionsStore, useDeliveryOptionsStore} from './store';
import {showOrHideDeliveryOptions, updateDeliveryOptions, updateDeliveryOptionsOutput} from './listeners';
import {EVENT_UPDATED_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options/src';
import {bootDeliveryOptions} from './utils/bootDeliveryOptions';
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
  const deliveryOptions = useDeliveryOptionsStore();

  void updateDeliveryOptions(checkout.state);

  checkout.on(StoreListener.Update, updateDeliveryOptions);

  deliveryOptions.on(StoreListener.Update, showOrHideDeliveryOptions);

  document.addEventListener(EVENT_UPDATED_DELIVERY_OPTIONS, updateDeliveryOptionsOutput);
};

export {useDeliveryOptionsStore} from './store';
