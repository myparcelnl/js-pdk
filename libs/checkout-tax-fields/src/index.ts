import {StoreListener, useCheckoutStore} from '@myparcel-pdk/checkout-common';
import {toggleTaxFields} from './utils';

/**
 * Initializes the checkout tax fields module.
 */
export const initializeCheckoutTaxFields = (): void => {
  const checkout = useCheckoutStore();

  checkout.on(StoreListener.Update, toggleTaxFields);

  toggleTaxFields();
};
