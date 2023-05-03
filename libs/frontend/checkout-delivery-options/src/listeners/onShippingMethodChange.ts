import {CheckoutStoreState, PdkField, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {shippingMethodHasDeliveryOptions, toggleDeliveryOptions, updateContext} from '../utils';

export const onShippingMethodChange = (
  newState: CheckoutStoreState,
  oldState: CheckoutStoreState,
): undefined | CheckoutStoreState => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  if (fieldsEqual(newState.form, oldState.form, PdkField.ShippingMethod)) {
    return;
  }

  newState.hasDeliveryOptions = shippingMethodHasDeliveryOptions(newState.form[PdkField.ShippingMethod]);

  toggleDeliveryOptions(newState.hasDeliveryOptions);

  void updateContext();

  return newState;
};
