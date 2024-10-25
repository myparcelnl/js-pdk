import {
  AddressField,
  type CheckoutStoreState,
  PdkUtil,
  type StoreCallbackUpdate,
  useCheckoutStore,
  useUtil,
} from '@myparcel-pdk/checkout-common';
import {triggerFormChange} from '../utils/triggerFormChange';
import {getFullStreet} from '../utils/getFullStreet';
import {getAddressFields} from '../utils/getAddressFields';
import {SEPARATE_ADDRESS_FIELDS} from '../constants';

/**
 * Fill address1 field when separate address fields are changed.
 */
export const synchronizeAddress1: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(PdkUtil.FieldsEqual);
  const setFieldValue = useUtil(PdkUtil.SetFieldValue);
  const getAddressFieldValue = useUtil(PdkUtil.GetAddressFieldValue);

  const checkout = useCheckoutStore();

  const addressTypesToUpdate = checkout.state.addressTypes.filter((addressType) => {
    return SEPARATE_ADDRESS_FIELDS.some((fieldName) => {
      return oldState && fieldsEqual(newState.form, oldState.form, fieldName, addressType);
    });
  });

  addressTypesToUpdate.forEach((addressType) => {
    const fields = getAddressFields(addressType);
    const hasAddress1 = getAddressFieldValue(AddressField.Address1, addressType);

    // Don't fill address1 before number or street have been filled.
    if (!hasAddress1 && (!fields.number || !fields.street)) {
      return;
    }

    setFieldValue(AddressField.Address1, getFullStreet(addressType), addressType, false);
  });

  if (addressTypesToUpdate.length) {
    triggerFormChange();
  }
};
