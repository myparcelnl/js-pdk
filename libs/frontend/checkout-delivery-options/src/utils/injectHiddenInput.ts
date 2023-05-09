import {useConfig, useSettings} from '@myparcel-pdk/frontend-checkout-core/src';
import {useDeliveryOptionsStore} from '../store';

/**
 * Create an input field in the checkout form to be able to pass the checkout data to the $_POST variable when
 * placing the order.
 */
export const injectHiddenInput = (): void => {
  const config = useConfig();
  const settings = useSettings();

  const hiddenInput = document.createElement('input');

  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', settings.hiddenInputName);

  config.getForm().appendChild(hiddenInput);

  const deliveryOptions = useDeliveryOptionsStore();

  void deliveryOptions.set({hiddenInput});
};
