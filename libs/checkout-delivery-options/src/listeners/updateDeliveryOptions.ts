import {
  AddressField,
  type CheckoutStoreState,
  PdkField,
  PdkUtil,
  type StoreCallbackUpdate,
  useUtil,
} from '@myparcel-pdk/checkout-common';
import {objectIsEqual} from '@myparcel/ts-utils';
import {useDeliveryOptionsStore} from '../utils/useDeliveryOptionsStore';
import {updateContext} from '../utils/updateContext';
import {shippingMethodHasDeliveryOptions} from '../utils/shippingMethodHasDeliveryOptions';
import {getDeliveryOptionsAddress} from '../utils/getDeliveryOptionsAddress';

export const updateDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = async (newState, oldState) => {
  const fieldsEqual = useUtil(PdkUtil.FieldsEqual);

  if (oldState && objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();

  if (oldState && !fieldsEqual(newState.form, oldState.form, AddressField.Country)) {
    await deliveryOptions.set({enabled: false});
    await updateContext();
  }

  const enabled = await shippingMethodHasDeliveryOptions(newState.form[PdkField.ShippingMethod]);

  const config = deliveryOptions.state.settings.updateDeliveryOptions(deliveryOptions.state);

  const configuration = {
    address: getDeliveryOptionsAddress(),
    config,
    strings: deliveryOptions.state.configuration.strings,
  };

  await deliveryOptions.set({enabled, configuration});
};
