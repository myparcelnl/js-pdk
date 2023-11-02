import {useConfig, useSettings} from '../utils';
import {type PdkCheckoutConfig, type PdkCheckoutConfigInput} from '../types';
import {type AddressType} from '../data';

export const createConfig = (config: PdkCheckoutConfigInput): PdkCheckoutConfig => ({
  formChange(callback) {
    const form = useConfig().getForm();
    form.addEventListener('change', callback);
  },

  getAddressType(value) {
    return value as AddressType;
  },

  getFormData() {
    const form = useConfig().getForm();
    const formData = new FormData(form);

    return Object.fromEntries(formData.entries());
  },

  hasDeliveryOptions(shippingMethod: string): boolean {
    const settings = useSettings();

    return settings.allowedShippingMethods.some((method) => shippingMethod === method);
  },

  ...config,
  selectors: {
    deliveryOptions: '#myparcel-delivery-options',
    ...config.selectors,
  },
});
