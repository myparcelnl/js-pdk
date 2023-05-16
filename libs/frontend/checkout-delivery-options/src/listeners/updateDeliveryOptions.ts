import {
  AddressField,
  CheckoutStoreState,
  PdkField,
  StoreCallbackUpdate,
  Util,
  useUtil,
} from '@myparcel-pdk/frontend-checkout-core/src';
import {getDeliveryOptionsAddress, shippingMethodHasDeliveryOptions, updateContext} from '../utils';
import {objectIsEqual} from '@myparcel/ts-utils';
import {useDeliveryOptionsStore} from '../store';

export const updateDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = async (newState, oldState) => {
  const fieldsEqual = useUtil(Util.FieldsEqual);

  if (oldState && objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();

  if (oldState && !fieldsEqual(newState.form, oldState.form, AddressField.Country)) {
    console.log('Country changed, resetting delivery options');
    await deliveryOptions.set({enabled: false});
    await updateContext();
  }

  await deliveryOptions.set({
    enabled: await shippingMethodHasDeliveryOptions(newState.form[PdkField.ShippingMethod]),
    configuration: {
      ...deliveryOptions.state.configuration,
      address: getDeliveryOptionsAddress(),
    },
  });
};
