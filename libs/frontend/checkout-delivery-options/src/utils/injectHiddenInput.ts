import {useCheckoutStore, useConfig, useSettingsStore} from '@myparcel-pdk/frontend-checkout-core/src';

/**
 * Create an input field in the checkout form to be able to pass the checkout data to the $_POST variable when
 * placing the order.
 */
export const injectHiddenInput = (): void => {
  const config = useConfig();
  const checkout = useCheckoutStore();
  const settings = useSettingsStore();
  const hiddenInput = document.createElement('input');

  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', settings.state.hiddenInputName);

  const form = config.getForm();

  form.appendChild(hiddenInput);

  checkout.set({hiddenInput});
};
