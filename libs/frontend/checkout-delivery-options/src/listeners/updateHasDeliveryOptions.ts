import {
  CheckoutStoreState,
  PdkField,
  StoreCallbackUpdate,
  Util,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';
import {shippingMethodHasDeliveryOptions} from '../utils';

export const updateHasDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  if (fieldsEqual(newState.form, oldState.form, PdkField.ShippingMethod)) {
    return;
  }

  newState.hasDeliveryOptions = shippingMethodHasDeliveryOptions(newState.form[PdkField.ShippingMethod]);

  return newState;
};
