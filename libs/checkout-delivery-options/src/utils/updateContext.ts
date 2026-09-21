import {useCheckoutStore} from '@myparcel-dev/pdk-checkout-common';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {fetchCheckoutContext} from './fetchCheckoutContext';

const clearKnownWeight = async (
  checkout: ReturnType<typeof useCheckoutStore>,
  deliveryOptions: ReturnType<typeof useDeliveryOptionsStore>,
  isCurrent: () => boolean,
): Promise<void> => {
  if (
    !isCurrent() ||
    !(
      deliveryOptions.state.configuration.config?.physicalProperties?.weight ||
      checkout.state.context.config?.physicalProperties?.weight
    )
  ) {
    return;
  }

  // A failed cart refresh cannot confirm the previous weight. Keep the other settings.
  await checkout.set({
    context: {
      ...checkout.state.context,
      config: {...checkout.state.context.config, physicalProperties: null},
    },
  });

  if (isCurrent()) {
    await deliveryOptions.set({
      configuration: {
        ...deliveryOptions.state.configuration,
        config: {...deliveryOptions.state.configuration.config, physicalProperties: null},
      },
    });
  }
};

/**
 * The last request that went out. Responses can arrive in another order than the requests were
 * sent, for example when a country change and a shipping method change follow each other quickly.
 */
let latestRequest = 0;

/**
 * Fetch and update the delivery options config. For use with changing shipping methods, for example, as doing so
 *  changes the prices of delivery and any extra options.
 */
export const updateContext = async (): Promise<void> => {
  const checkout = useCheckoutStore();
  const deliveryOptions = useDeliveryOptionsStore();

  // Core checkout scripts can be loaded without the Delivery Options module.
  if (!deliveryOptions) {
    return;
  }

  const request = (latestRequest += 1);
  const isCurrent = (): boolean => request === latestRequest && useDeliveryOptionsStore() === deliveryOptions;

  const context = await fetchCheckoutContext().catch(async (error: unknown) => {
    // Keep the original request error for the integration's error handler.
    await clearKnownWeight(checkout, deliveryOptions, isCurrent).catch(() => undefined);
    throw error;
  });

  // An older response must not overwrite a newer cart or a reinitialized checkout.
  if (!isCurrent()) {
    return;
  }

  await checkout.set({context});

  if (!isCurrent()) {
    return;
  }

  const state = {
    ...deliveryOptions.state,
    originalPackageType: context.config?.packageType ?? deliveryOptions.state.originalPackageType,
    configuration: {
      ...deliveryOptions.state.configuration,
      config: {...deliveryOptions.state.configuration.config, ...context.config},
      strings: {...deliveryOptions.state.configuration.strings, ...context.strings},
    },
  };

  // Apply the platform's carrier and package rules to the fresh checkout context.
  state.configuration.config = state.settings.updateDeliveryOptions(state);

  await deliveryOptions.set({
    originalPackageType: state.originalPackageType,
    configuration: state.configuration,
  });
};
