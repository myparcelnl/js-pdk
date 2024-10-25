import {StoreListener, useCheckoutStore} from '@myparcel-pdk/checkout-common';
import {prepareFields} from './utils/prepareFields';
import {fillAddress1} from './utils/fillAddress1';
import {synchronizeAddressOnCountryChange} from './listeners/synchronizeAddressOnCountryChange';
import {synchronizeAddress1} from './listeners/synchronizeAddress1';

export type {SeparateAddressFields} from './types';

export {SPLIT_STREET_REGEX} from './constants';

/**
 * Initializes the checkout separate address fields module.
 */
export const initializeCheckoutSeparateAddressFields = (): void => {
  const checkout = useCheckoutStore();

  checkout.on(StoreListener.Update, synchronizeAddressOnCountryChange);
  checkout.on(StoreListener.Update, synchronizeAddress1);

  prepareFields();
  fillAddress1();
};
