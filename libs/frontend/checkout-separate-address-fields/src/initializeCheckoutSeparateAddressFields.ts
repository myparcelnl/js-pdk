// noinspection JSUnusedGlobalSymbols
import {PdkEvent, StoreListener, useCheckoutStore, useEvent} from '@myparcel-pdk/frontend-checkout-core/src';
import {prepareFields, synchronizeAddress} from './utils';
import {synchronizeAddress1} from './listeners/synchronizeAddress1';

export const initializeCheckoutSeparateAddressFields = (): void => {
  document.addEventListener(useEvent(PdkEvent.CheckoutUpdate), synchronizeAddress);

  const checkout = useCheckoutStore();

  checkout.on(StoreListener.Update, synchronizeAddress1);

  prepareFields();
};
