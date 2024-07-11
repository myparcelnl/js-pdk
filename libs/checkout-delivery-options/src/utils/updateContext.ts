import {type Plugin} from '@myparcel-pdk/common';
import {useCheckoutStore} from '@myparcel-pdk/checkout-common';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';
import {fetchCheckoutContext} from './fetchCheckoutContext';

/**
 * Fetch and update the delivery options config. For use with changing shipping methods, for example, as doing so
 *  changes the prices of delivery and any extra options.
 */
export const updateContext = async (): Promise<Plugin.ModelContextCheckoutContext> => {
  const context = await fetchCheckoutContext();

  const checkout = useCheckoutStore();
  const deliveryOptions = useDeliveryOptionsStore();

  await Promise.all([
    checkout.set(context.settings),
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

  return context;
};
