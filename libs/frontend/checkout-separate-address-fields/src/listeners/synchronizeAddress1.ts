import {
  ADDRESS_TYPES,
  AddressField,
  CheckoutStoreState,
  StoreCallbackUpdate,
  Util,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';
import {fillAddressFields, getFullStreet} from '../utils';

export const synchronizeAddress1: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  ADDRESS_TYPES.forEach((addressType) => {
    [AddressField.Street, AddressField.Number].forEach((fieldName) => {
      if (fieldsEqual(newState.form, oldState.form, fieldName, addressType)) {
        return;
      }

      fillAddressFields(
        {
          [AddressField.Address1]: getFullStreet(addressType),
        },
        addressType,
      );
    });
  });
};
