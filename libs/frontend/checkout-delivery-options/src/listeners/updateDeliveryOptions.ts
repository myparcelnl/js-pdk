import {CheckoutStoreState, StoreCallbackUpdate} from '@myparcel-pdk/frontend-checkout-core/src';
import {getDeliveryOptionsAddress, useDeliveryOptionsStore} from '../utils';
import {objectIsEqual} from '@myparcel/ts-utils';

export const updateDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = async (newState, oldState) => {
  if (objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();

  await deliveryOptions.set({
    configuration: {
      ...deliveryOptions.state.configuration,
      address: getDeliveryOptionsAddress(),
    },
  });
};
