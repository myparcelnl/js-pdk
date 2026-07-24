import {useCheckoutStore} from '@myparcel-dev/pdk-checkout-common';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {fetchCheckoutContext} from './fetchCheckoutContext';

/**
 * Fetch and update the delivery options config. For use with changing shipping methods, for example, as doing so
 *  changes the prices of delivery and any extra options.
 */
export const updateContext = async (): Promise<void> => {
  const context = await fetchCheckoutContext();

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
        // Pass **all** the shipment options from the cart, so that the delivery options can render excludes/requires
        // Ex. "age check" is not selectable in the DO but it makes signature/onlyRecipient mandatory.
        // Replaced wholesale when present; kept when the context omits the key (older PDK
        // versions, or the empty-context fallback after a failed fetch).
        cartShipmentOptions: context.cartShipmentOptions ?? deliveryOptions.state.configuration.cartShipmentOptions,
      },
    }),
  ]);
};
