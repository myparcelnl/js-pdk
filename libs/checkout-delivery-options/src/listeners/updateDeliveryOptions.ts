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

const updates = new WeakMap<ReturnType<typeof useDeliveryOptionsStore>, number>();

export const updateDeliveryOptions: StoreCallbackUpdate<CheckoutStoreState> = async (newState, oldState) => {
  if (oldState && objectIsEqual(newState.form, oldState.form)) {
    return;
  }

  const deliveryOptions = useDeliveryOptionsStore();
  const update = (updates.get(deliveryOptions) ?? 0) + 1;
  updates.set(deliveryOptions, update);
  const isCurrent = (): boolean =>
    updates.get(deliveryOptions) === update && useDeliveryOptionsStore() === deliveryOptions;

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
      // The previous settings remain usable and the unconfirmed weight has been cleared.
      // Continue applying the current form so a failed request cannot leave the widget disabled.
      // eslint-disable-next-line no-console
      console.warn('[myparcel-pdk] Could not refresh the checkout context', error);
    }

    if (!isCurrent()) {
      return;
    }
  }

  const enabled = await shippingMethodHasDeliveryOptions(newState.form[PdkField.ShippingMethod]);

  // A previous form change must not restore its shipping method after a newer selection.
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
