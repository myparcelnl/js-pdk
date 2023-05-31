import {EVENT_UPDATED_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options';
import {StoreListener, useCheckoutStore} from '@myparcel-pdk/frontend-checkout-core';
import {injectHiddenInput} from './utils';
import {createDeliveryOptionsStore} from './store';
import {updateDeliveryOptions, updateDeliveryOptionsOutput} from './listeners';

export {PdkDeliveryOptionsEvent} from './types';

/**
 * Initializes the checkout delivery options module.
 */
export const initializeCheckoutDeliveryOptions = (): void => {
  // TODO: figure out why the build reports a ts error here.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.MyParcelPdk.stores.deliveryOptions = createDeliveryOptionsStore();

  injectHiddenInput();

  const checkout = useCheckoutStore();

  void updateDeliveryOptions(checkout.state);

  checkout.on(StoreListener.Update, updateDeliveryOptions);

  document.addEventListener(EVENT_UPDATED_DELIVERY_OPTIONS, updateDeliveryOptionsOutput);
};

export {useDeliveryOptionsStore} from './store';
