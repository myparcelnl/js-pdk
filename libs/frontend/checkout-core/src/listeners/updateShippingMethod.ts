import {
  CheckoutStoreState,
  PdkField,
  StoreCallbackUpdate,
  Util,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';

export const updateShippingMethod: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);
  const getFieldValue = useUtil(Util.GetFieldValue);

  if (fieldsEqual(newState.form, oldState.form, PdkField.ShippingMethod)) {
    return;
  }

  newState[PdkField.ShippingMethod] = getFieldValue(PdkField.ShippingMethod);

  return newState;
};
