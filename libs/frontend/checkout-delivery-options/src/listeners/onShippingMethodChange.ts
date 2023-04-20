import {CheckoutStoreState, PdkField, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {fetchContext, shippingMethodHasDeliveryOptions, toggleDeliveryOptions} from '../utils';

export const onShippingMethodChange = (
  newState: CheckoutStoreState,
  oldState: CheckoutStoreState,
): undefined | CheckoutStoreState => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  if (fieldsEqual(newState.form, oldState.form, PdkField.ShippingMethod)) {
    return;
  }

  newState.hasDeliveryOptions = shippingMethodHasDeliveryOptions(newState.form.shippingMethod);

  toggleDeliveryOptions(newState.hasDeliveryOptions);
  fetchContext();

  return newState;
};
