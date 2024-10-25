import {type PdkCheckoutConfig, type PdkCheckoutConfigInput} from '../types/checkout.types';
import {defaultHasDeliveryOptions} from '../defaults/defaultHasDeliveryOptions';
import {defaultGetFormData} from '../defaults/defaultGetFormData';
import {defaultGetAddressType} from '../defaults/defaultGetAddressType';
import {defaultFormChange} from '../defaults/defaultFormChange';

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
