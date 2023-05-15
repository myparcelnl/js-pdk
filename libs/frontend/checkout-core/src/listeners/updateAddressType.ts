import {
  CheckoutStoreState,
  PdkField,
  StoreCallbackUpdate,
  Util,
  useConfig,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';

export const updateAddressType: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  if (fieldsEqual(newState.form, oldState.form, PdkField.AddressType)) {
    return;
  }

  newState.addressType = useConfig().getAddressType(newState.form[PdkField.AddressType]);
};
