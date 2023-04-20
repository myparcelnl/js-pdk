import {AddressType} from '../../types';
import {useConfig} from '../../config';

export const getAddressType = (): AddressType => {
  const config = useConfig();

  let useShipping = false;
  const addressCheckbox: HTMLInputElement | null = document.querySelector(config.fields.toggleAddressType);

  if (addressCheckbox) {
    useShipping = addressCheckbox.checked;
  }

  return useShipping ? AddressType.Shipping : AddressType.Billing;
};
