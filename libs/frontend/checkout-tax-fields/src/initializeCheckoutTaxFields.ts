import {StoreListener, useCheckoutStore} from '@myparcel-pdk/frontend-checkout-core/src';
import {toggleTaxFields} from './utils';

export const initializeCheckoutTaxFields = (): void => {
  const checkout = useCheckoutStore();

  checkout.on(StoreListener.Update, () => {
    toggleTaxFields();
  });
};
