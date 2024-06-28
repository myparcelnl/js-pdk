import {type PdkCheckoutConfig, type PdkCheckoutConfigInput} from '../types';
import {defaultFormChange, defaultGetAddressType, defaultGetFormData, defaultHasDeliveryOptions} from '../defaults';

export const createConfig = (config: PdkCheckoutConfigInput): PdkCheckoutConfig => ({
  formChange: defaultFormChange,
  getAddressType: defaultGetAddressType,
  getFormData: defaultGetFormData,
  hasDeliveryOptions: defaultHasDeliveryOptions,

  ...config,
  selectors: {
    deliveryOptions: '#myparcel-delivery-options',
    ...config.selectors,
  },
});
