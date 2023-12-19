import {FrontendEndpoint} from '@myparcel-pdk/common';
import {PdkField, PdkUtil, useCheckoutStore, useUtil} from '@myparcel-pdk/checkout-common';
import {useDeliveryOptionsStore} from './useDeliveryOptionsStore';

/**
 * Fetch and update the delivery options config. For use with changing shipping methods, for example, as doing so
 *  changes the prices of delivery and any extra options.
 */
export const updateContext = async (): Promise<void> => {
  const doRequest = useUtil(PdkUtil.DoRequest);
  const getFieldValue = useUtil(PdkUtil.GetFieldValue);

  const context = await doRequest(FrontendEndpoint.FetchCheckoutContext, {
    shippingMethod: getFieldValue(PdkField.ShippingMethod),
  });

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
};
