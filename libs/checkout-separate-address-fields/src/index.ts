import {StoreListener, useCheckoutStore} from '@myparcel-pdk/checkout-common';
import {fillAddress1, prepareFields, synchronizeAddressOnCountryChange} from './utils';
import {synchronizeAddress1} from './listeners';

export type {AllAddressFields} from './types';

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
