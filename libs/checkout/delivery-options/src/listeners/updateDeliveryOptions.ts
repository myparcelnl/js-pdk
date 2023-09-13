import {
  AddressField,
  type CheckoutStoreState,
  PdkField,
  type StoreCallbackUpdate,
  useUtil,
  Util,
} from '@myparcel-pdk/checkout-core';
import {objectIsEqual} from '@myparcel/ts-utils';
import {getDeliveryOptionsAddress, shippingMethodHasDeliveryOptions, updateContext} from '../utils';
import {useDeliveryOptionsStore} from '../store';

export const updateDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = async (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  if (oldState && objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();

  if (oldState && !fieldsEqual(newState.form, oldState.form, AddressField.Country)) {
    await deliveryOptions.set({enabled: false});
    await updateContext();
  }

  await deliveryOptions.set({
    enabled: await shippingMethodHasDeliveryOptions(newState.form[PdkField.ShippingMethod]),
    configuration: {
      address: getDeliveryOptionsAddress(),
      config: deliveryOptions.state.settings.updateDeliveryOptions(deliveryOptions.state),
      strings: deliveryOptions.state.configuration.strings,
    },
  });
};
