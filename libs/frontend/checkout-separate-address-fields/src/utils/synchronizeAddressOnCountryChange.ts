import {
  AddressField,
  CheckoutStoreState,
  StoreCallbackUpdate,
  Util,
  useCheckoutStore,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';
import {fillAddressFields} from './fillAddressFields';
import {getFullStreet} from './getFullStreet';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';
import {splitAddress1} from './splitAddress1';

/**
 * Sync addresses between split and non-split address fields.
 */
export const synchronizeAddressOnCountryChange: StoreCallbackUpdate<CheckoutStoreState> = (
  newState,
  oldState,
): void => {
  const fieldsEqual = useUtil(Util.FieldsEqual);
  const checkout = useCheckoutStore();

  checkout.state.addressTypes
    // Only sync addresses if the country changed.
    .filter((addressType) => !fieldsEqual(newState.form, oldState.form, AddressField.Country, addressType))
    .forEach((addressType) => {
      const newAddress = hasSeparateAddressFields(addressType)
        ? splitAddress1(addressType)
        : {[AddressField.Address1]: getFullStreet(addressType)};

      fillAddressFields(newAddress, addressType);
    });
};
