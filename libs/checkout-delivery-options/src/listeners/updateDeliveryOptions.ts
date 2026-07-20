import {objectIsEqual} from '@myparcel-dev/ts-utils';
import {
  AddressField,
  type CheckoutStoreState,
  PdkField,
  type StoreCallbackUpdate,
} from '@myparcel-dev/pdk-checkout-common';
import {
  getDeliveryOptionsAddress,
  shippingMethodHasDeliveryOptions,
  updateContext,
  useDeliveryOptionsStore,
} from '../utils';

export const updateDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = async (newState, oldState) => {
  if (oldState && objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();

  // Compare the *effective* delivery country: the country of the active address in each state.
  const oldCountry = oldState?.form[oldState.addressType]?.[AddressField.Country];
  const newCountry = newState.form[newState.addressType]?.[AddressField.Country];

  if (oldState && oldCountry !== newCountry) {
    await deliveryOptions.set({enabled: false});
    await updateContext();
  }

  const enabled = await shippingMethodHasDeliveryOptions(newState.form[PdkField.ShippingMethod]);

  const config = deliveryOptions.state.settings.updateDeliveryOptions(deliveryOptions.state);

  const configuration = {
    ...deliveryOptions.state.configuration,
    address: getDeliveryOptionsAddress(),
    config,
    strings: deliveryOptions.state.configuration.strings,
  };

  await deliveryOptions.set({enabled, configuration});
};
