import {type Plugin} from '@myparcel-dev/pdk-common';
import {useCheckoutStore} from '@myparcel-dev/pdk-checkout-common';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {fetchCheckoutContext} from './fetchCheckoutContext';

/**
 * Remove the cart weight from the checkout context and from the delivery options config.
 *
 * updateContext calls this when the request for a new checkout context fails. The cart can have
 * changed since the last context, so the weight in that context can be wrong. Without a weight, the
 * delivery options do not filter on weight. The other settings stay, because later requests need them.
 */
const removeCartWeight = async (
  checkout: ReturnType<typeof useCheckoutStore>,
  deliveryOptions: ReturnType<typeof useDeliveryOptionsStore>,
  isCurrent: () => boolean,
): Promise<void> => {
  if (!isCurrent()) {
    return;
  }

  const hasWeight = Boolean(
    deliveryOptions.state.configuration.config?.physicalProperties?.weight ||
      checkout.state.context.config?.physicalProperties?.weight,
  );

  if (!hasWeight) {
    return;
  }

  await checkout.set({
    context: {
      ...checkout.state.context,
      config: {...checkout.state.context.config, physicalProperties: null},
    },
  });

  // The checkout store listeners can take time. Check again that no newer request has started.
  if (!isCurrent()) {
    return;
  }

  await deliveryOptions.set({
    configuration: {
      ...deliveryOptions.state.configuration,
      config: {...deliveryOptions.state.configuration.config, physicalProperties: null},
    },
  });
};

/**
 * The last request that went out. Responses can arrive in another order than the requests were
 * sent, for example when a country change and a shipping method change follow each other quickly.
 */
let latestRequest = 0;

/**
 * Fetch a new checkout context and put it in the checkout store and the delivery options config.
 * For use when the shipping method or the cart changes, because that changes the prices, the
 * package type and the cart weight.
 *
 * A response is used only while no newer call has started and the checkout was not initialized
 * again. An older response is ignored.
 *
 * @throws {Error} When the request fails or its response has no usable settings. The stores keep
 *  their settings, and the cart weight is removed.
 */
export const updateContext = async (): Promise<void> => {
  const checkout = useCheckoutStore();
  const deliveryOptions = useDeliveryOptionsStore();

  // The core checkout script can run without the delivery options script.
  if (!deliveryOptions) {
    return;
  }

  const request = (latestRequest += 1);
  // Initializing the checkout again creates a new delivery options store.
  const isCurrent = (): boolean => request === latestRequest && useDeliveryOptionsStore() === deliveryOptions;

  let context: Plugin.ModelContextCheckoutContext;

  try {
    context = await fetchCheckoutContext();
  } catch (error) {
    // Throw the error of the request, also when removing the weight fails.
    await removeCartWeight(checkout, deliveryOptions, isCurrent).catch(() => undefined);
    throw error;
  }

  if (!isCurrent()) {
    return;
  }

  await checkout.set({context});

  // The checkout store listeners can take time. Check again that no newer request has started.
  if (!isCurrent()) {
    return;
  }

  const state = {
    ...deliveryOptions.state,
    // The package type of the new context is the fallback when the shipping method has no package type.
    originalPackageType: context.config?.packageType ?? deliveryOptions.state.originalPackageType,
    configuration: {
      ...deliveryOptions.state.configuration,
      config: {...deliveryOptions.state.configuration.config, ...context.config},
      strings: {...deliveryOptions.state.configuration.strings, ...context.strings},
    },
  };

  // Let the platform set the package type and its own changes on the new config, as after a form change.
  state.configuration.config = state.settings.updateDeliveryOptions(state);

  await deliveryOptions.set({
    originalPackageType: state.originalPackageType,
    configuration: state.configuration,
  });
};
