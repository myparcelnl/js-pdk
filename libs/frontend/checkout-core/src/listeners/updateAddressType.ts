import {
  AddressType,
  CheckoutStoreState,
  PdkField,
  StoreCallbackUpdate,
  Util,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';

export const updateAddressType: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  if (fieldsEqual(newState.form, oldState.form, PdkField.ToggleAddressType)) {
    return;
  }

  const shipToDifferentAddress = newState.form[PdkField.ToggleAddressType] === '1';

  newState.addressType = shipToDifferentAddress ? AddressType.Billing : AddressType.Shipping;
};
