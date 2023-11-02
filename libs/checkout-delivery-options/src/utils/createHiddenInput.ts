import {useConfig, useSettings} from '@myparcel-pdk/checkout-common';

export const createHiddenInput = (): HTMLInputElement => {
  const settings = useSettings();
  const existingInput = document.querySelector<HTMLInputElement>(`input[name="${settings.hiddenInputName}"]`);

  if (existingInput) {
    return existingInput;
  }

  const config = useConfig();

  const hiddenInput = document.createElement('input');

  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', settings.hiddenInputName);

  config.getForm().appendChild(hiddenInput);

  return hiddenInput;
};
