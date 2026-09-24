import {useCheckoutStore} from '@myparcel-dev/pdk-checkout-common';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {fetchCheckoutContext} from './fetchCheckoutContext';

const requests = new WeakMap<ReturnType<typeof useDeliveryOptionsStore>, number>();

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
 * Refresh the checkout configuration after cart or shipping-method changes.
 */
export const updateContext = async (): Promise<void> => {
  const checkout = useCheckoutStore();
  const deliveryOptions = useDeliveryOptionsStore();

  // Core checkout scripts can be loaded without the Delivery Options module.
  if (!deliveryOptions) {
    return;
  }

  const request = (requests.get(deliveryOptions) ?? 0) + 1;
  requests.set(deliveryOptions, request);
  const isCurrent = (): boolean =>
    requests.get(deliveryOptions) === request && useDeliveryOptionsStore() === deliveryOptions;

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
