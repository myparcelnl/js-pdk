import {EVENT_UPDATED_DELIVERY_OPTIONS} from '@myparcel-pdk/delivery-options';
import {StoreListener, useCheckoutStore} from '@myparcel-pdk/checkout-core';
import {initializeHiddenInput} from './utils';
import {type CheckoutDeliveryOptionsSettingsInput} from './types';
import {createDeliveryOptionsStore} from './store';
import {updateDeliveryOptions, updateDeliveryOptionsOutput} from './listeners';

export * from './store';
export * from './types';

/**
 * Initializes the checkout delivery options module.
 */
export const initializeCheckoutDeliveryOptions = (settings?: CheckoutDeliveryOptionsSettingsInput): void => {
  // TODO: figure out why the build reports a ts error here.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.MyParcelPdk.stores.deliveryOptions = createDeliveryOptionsStore(settings);

  initializeHiddenInput();

  const checkout = useCheckoutStore();

  void updateDeliveryOptions(checkout.state);

  checkout.on(StoreListener.Update, updateDeliveryOptions);

  document.addEventListener(EVENT_UPDATED_DELIVERY_OPTIONS, updateDeliveryOptionsOutput);
};

export {useDeliveryOptionsStore} from './store';
