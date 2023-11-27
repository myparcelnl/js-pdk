import {AddressField, type AddressType, PdkUtil, useUtil} from '@myparcel-pdk/checkout-common';
import {type DeliveryOptionsConfiguration} from '../types';

export const getDeliveryOptionsAddress = (type?: AddressType): DeliveryOptionsConfiguration['address'] => {
  const getAddressFieldValue = useUtil(PdkUtil.GetAddressFieldValue);
  const address1 = getAddressFieldValue(AddressField.Address1, type) ?? '';
  const address2 = getAddressFieldValue(AddressField.Address2, type) ?? '';

  return {
    cc: getAddressFieldValue(AddressField.Country, type) ?? '',
    postalCode: getAddressFieldValue(AddressField.PostalCode, type) ?? '',
    street: [address1, address2].join(' ').trim(),
    city: getAddressFieldValue(AddressField.City, type) ?? '',
  };
};