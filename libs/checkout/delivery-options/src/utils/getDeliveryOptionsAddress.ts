import {AddressField, type AddressType, useUtil, Util} from '@myparcel-pdk/checkout-core';
import {type DeliveryOptionsConfiguration} from '../types';

export const getDeliveryOptionsAddress = (type?: AddressType): DeliveryOptionsConfiguration['address'] => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  return {
    cc: getAddressFieldValue(AddressField.Country, type) ?? '',
    postalCode: getAddressFieldValue(AddressField.PostalCode, type) ?? '',
    street: getAddressFieldValue(AddressField.Address1, type) ?? '',
    city: getAddressFieldValue(AddressField.City, type) ?? '',
  };
};
