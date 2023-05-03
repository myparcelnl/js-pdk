import {
  AddressField,
  CheckoutStoreState,
  SEPARATE_ADDRESS_FIELDS,
  StoreCallbackUpdate,
  Util,
  useCheckoutStore,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';
import {fillAddressFields, getFullStreet} from '../utils';

/**
 * Fill address1 field when separate address fields are changed.
 */
export const synchronizeAddress1: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);
  const setFieldValue = useUtil(Util.SetFieldValue);

  const checkout = useCheckoutStore();

  const addressTypesToUpdate = checkout.state.addressTypes.filter((addressType) => {
    return SEPARATE_ADDRESS_FIELDS.some((fieldName) => {
      return fieldsEqual(newState.form, oldState.form, fieldName, addressType);
    });
  });

  addressTypesToUpdate.forEach((addressType) => {
    setFieldValue(AddressField.Address1, getFullStreet(addressType), addressType, false);
  });

  if (addressTypesToUpdate.length) {
    fillAddressFields();
  }
};
