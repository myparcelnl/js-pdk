import {AddressField, AddressType, PdkField} from '@myparcel-pdk/checkout-common';
import {type RecursivePartial} from '@myparcel/ts-utils';
import {type PdkCheckoutConfigInput} from '../types';

export const getMockFormData = (
  formData?: RecursivePartial<PdkCheckoutConfigInput['formData']>,
): PdkCheckoutConfigInput['formData'] => {
  return {
    [PdkField.AddressType]: 'address-type',
    [PdkField.ShippingMethod]: 'shipping-method',
    [AddressType.Billing]: {
      [AddressField.Address1]: 'b-address1',
      [AddressField.Address2]: 'b-address2',
      [AddressField.City]: 'b-city',
      [AddressField.Country]: 'b-country',
      [AddressField.PostalCode]: 'b-postal-code',
      ...formData?.[AddressType.Billing],
    },
    [AddressType.Shipping]: {
      [AddressField.Address1]: 's-address1',
      [AddressField.Address2]: 's-address2',
      [AddressField.City]: 's-city',
      [AddressField.Country]: 's-country',
      [AddressField.PostalCode]: 's-postal-code',
      ...formData?.[AddressType.Shipping],
    },
    ...formData,
  } as PdkCheckoutConfigInput['formData'];
};
