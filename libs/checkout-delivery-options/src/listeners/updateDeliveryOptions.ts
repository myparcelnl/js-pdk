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

/**
 * The last form change that this listener started to handle. A form change can wait for a new checkout
 * context, and a newer form change can start in the meantime.
 */
let latestFormChange = 0;

/**
 * Update the delivery options after a change in the checkout form. When the delivery country changes,
 * fetch a new checkout context first.
 */
export const updateDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = async (newState, oldState) => {
  if (oldState && objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();
  latestFormChange += 1;
  const formChange = latestFormChange;
  // Initializing the checkout again creates a new delivery options store.
  const isCurrent = (): boolean => formChange === latestFormChange && useDeliveryOptionsStore() === deliveryOptions;

  // Compare the *effective* delivery country: the country of the active address in each state.
  const oldCountry = oldState?.form[oldState.addressType]?.[AddressField.Country];
  const newCountry = newState.form[newState.addressType]?.[AddressField.Country];

  if (oldState && oldCountry !== newCountry) {
    await deliveryOptions.set({enabled: false});

    if (!isCurrent()) {
      return;
    }

    try {
      await updateContext();
    } catch (error) {
      // updateContext keeps the current settings when it fails. Continue with the current form,
      // so that a failed request does not leave the delivery options disabled.
      // eslint-disable-next-line no-console
      console.warn('[myparcel-pdk] Could not update the checkout context', error);
    }

    if (!isCurrent()) {
      return;
    }
  }

  const enabled = await shippingMethodHasDeliveryOptions(newState.form[PdkField.ShippingMethod]);

  // A newer form change started while this one waited. Stop, so that this older form does not overwrite it.
  if (!isCurrent()) {
    return;
  }

  const config = deliveryOptions.state.settings.updateDeliveryOptions(deliveryOptions.state);

  const configuration = {
    ...deliveryOptions.state.configuration,
    address: getDeliveryOptionsAddress(),
    config,
    strings: deliveryOptions.state.configuration.strings,
  };

  await deliveryOptions.set({enabled, configuration});
};
