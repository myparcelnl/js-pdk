import {
  AddressField,
  CheckoutStoreState,
  StoreCallbackUpdate,
  fieldsEqual,
} from '@myparcel-pdk/frontend-checkout-core/src';
import {getDeliveryOptionsAddress, toggleDeliveryOptions, updateContext} from '../utils';
import {objectIsEqual} from '@myparcel/ts-utils';
import {useDeliveryOptionsStore} from '../store';

export const updateDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = async (newState, oldState) => {
  if (objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();

  if (!fieldsEqual(newState.form, oldState.form, AddressField.Country)) {
    toggleDeliveryOptions(false);
    await updateContext();
    toggleDeliveryOptions(newState.hasDeliveryOptions);
  }

  await deliveryOptions.set({
    configuration: {
      ...deliveryOptions.state.configuration,
      address: getDeliveryOptionsAddress(),
    },
  });
};
