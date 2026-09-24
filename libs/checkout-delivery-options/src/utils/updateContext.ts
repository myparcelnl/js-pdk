import {useCheckoutStore} from '@myparcel-dev/pdk-checkout-common';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {fetchCheckoutContext} from './fetchCheckoutContext';

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
  const request = (latestRequest += 1);
  const context = await fetchCheckoutContext();

  // A later request answered first, so this context describes a state that is already gone.
  if (request !== latestRequest) {
    return;
  }

  const checkout = useCheckoutStore();
  const deliveryOptions = useDeliveryOptionsStore();

  await Promise.all([
    checkout.set({context}),
    deliveryOptions.set({
      configuration: {
        ...deliveryOptions.state.configuration,
        config: {
          ...deliveryOptions.state.configuration.config,
          ...context.config,
        },
        strings: {
          ...deliveryOptions.state.configuration.strings,
          ...context.strings,
        },
      },
    }),
  ]);
};
