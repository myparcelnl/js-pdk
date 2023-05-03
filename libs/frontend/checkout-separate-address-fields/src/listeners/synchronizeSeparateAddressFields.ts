import {
  AddressField,
  CheckoutStoreState,
  StoreCallbackUpdate,
  Util,
  useCheckoutStore,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';
import {fillAddressFields, getFullStreet, splitAddress} from '../utils';

/**
 * Fill separate address fields when address1 field is changed.
 */
export const synchronizeSeparateAddressFields: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  const checkout = useCheckoutStore();

  checkout.state.addressTypes.forEach((addressType) => {
    if (fieldsEqual(newState.form, oldState.form, AddressField.Address1, addressType)) {
      return;
    }

    const address = splitAddress(getFullStreet(addressType));

    fillAddressFields(
      {
        [AddressField.Street]: address.street,
        [AddressField.Number]: address.number,
        [AddressField.NumberSuffix]: address.numberSuffix,
      },
      addressType,
    );
  });
};
