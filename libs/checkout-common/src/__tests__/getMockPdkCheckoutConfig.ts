import {vi} from 'vitest';
import {type PdkCheckoutConfigInput} from '../types';
import {AddressField, AddressType, PdkField} from '../data';
import {doRequestSpy, getFormDataSpy, getFormSpy, hasAddressTypeSpy, initializeSpy, toggleFieldSpy} from './spies';
import {getMockFormData} from './getMockFormData';

export const getMockPdkCheckoutConfig = vi.fn(
  (config?: Partial<PdkCheckoutConfigInput>): PdkCheckoutConfigInput => ({
    doRequest: doRequestSpy,
    getForm: getFormSpy,
    getFormData: getFormDataSpy,
    hasAddressType: hasAddressTypeSpy,
    initialize: initializeSpy,
    toggleField: toggleFieldSpy,

    selectors: {
      deliveryOptions: '#delivery-options',
      deliveryOptionsWrapper: '#delivery-options-wrapper',
      ...config?.selectors,
    },

    fields: {
      [PdkField.AddressType]: 'address-type',
      [PdkField.ShippingMethod]: 'shipping-method',
      [AddressType.Billing]: {
        [AddressField.Address1]: 'b-address1',
        [AddressField.Address2]: 'b-address2',
        [AddressField.City]: 'b-city',
        [AddressField.Country]: 'b-country',
        [AddressField.PostalCode]: 'b-postal-code',
        ...config?.fields?.[AddressType.Billing],
      },
      [AddressType.Shipping]: {
        [AddressField.Address1]: 's-address1',
        [AddressField.Address2]: 's-address2',
        [AddressField.City]: 's-city',
        [AddressField.Country]: 's-country',
        [AddressField.PostalCode]: 's-postal-code',
        ...config?.fields?.[AddressType.Shipping],
      },
      ...config?.fields,
    },

    formData: getMockFormData(config?.formData),
  }),
);
