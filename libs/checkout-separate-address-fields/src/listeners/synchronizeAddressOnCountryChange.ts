import {
  AddressField,
  type CheckoutStoreState,
  PdkUtil,
  type StoreCallbackUpdate,
  useCheckoutStore,
  useUtil,
} from '@myparcel-pdk/checkout-common';
import {splitAddress} from '../utils/splitAddress';
import {hasSeparateAddressFields} from '../utils/hasSeparateAddressFields';
import {getFullStreet} from '../utils/getFullStreet';
import {fillAddressFields} from '../utils/fillAddressFields';

/**
 * Sync addresses between split and non-split address fields.
 */
export const synchronizeAddressOnCountryChange: StoreCallbackUpdate<CheckoutStoreState> = (
  newState,
  oldState,
): void => {
  const fieldsEqual = useUtil(PdkUtil.FieldsEqual);
  const checkout = useCheckoutStore();

  checkout.state.addressTypes
    // Only sync addresses if the country changed.
    .filter((addressType) => oldState && !fieldsEqual(newState.form, oldState.form, AddressField.Country, addressType))
    .forEach((addressType) => {
      const newAddress = hasSeparateAddressFields(addressType)
        ? splitAddress(addressType)
        : {[AddressField.Address1]: getFullStreet(addressType)};

      fillAddressFields(newAddress, addressType);
    });
};
