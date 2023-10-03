import {useUtil, Util} from '@myparcel-pdk/checkout-core';
import {AddressField, type AddressType} from '@myparcel-pdk/checkout-common';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';
import {getAddressFields} from './getAddressFields';

export const getFullStreet = (addressType: AddressType): string => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  if (!hasSeparateAddressFields(addressType)) {
    return getAddressFieldValue(AddressField.Address1, addressType) ?? '';
  }

  const fields = getAddressFields(addressType);

  return Object.values(fields).join(' ').trim();
};
