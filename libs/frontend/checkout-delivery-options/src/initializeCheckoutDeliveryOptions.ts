import {StoreListener, Util, useCheckoutStore, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {onUpdateForm, updateDeliveryOptionsOutput} from './listeners';
import {EVENT_UPDATED_DELIVERY_OPTIONS} from '@myparcel-pdk/frontend-delivery-options/src';
import {initializeDeliveryOptionsStore} from './store';
import {injectHiddenInput} from './utils';

// noinspection JSUnusedGlobalSymbols
export const initializeCheckoutDeliveryOptions = (): void => {
  const getFrontendContext = useUtil(Util.GetFrontendContext);
  const checkout = useCheckoutStore();

  injectHiddenInput();
  initializeDeliveryOptionsStore(getFrontendContext());

  checkout.on(StoreListener.Update, onUpdateForm);

  document.addEventListener(EVENT_UPDATED_DELIVERY_OPTIONS, updateDeliveryOptionsOutput);
};
