import {AddressField, type AddressType, PdkUtil, useUtil} from '@myparcel-pdk/checkout-common';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';
import {getAddressFields} from './getAddressFields';

export const getFullStreet = (addressType: AddressType): string => {
  const getAddressFieldValue = useUtil(PdkUtil.GetAddressFieldValue);

  if (!hasSeparateAddressFields(addressType)) {
    const address1 = getAddressFieldValue(AddressField.Address1, addressType) ?? '';
    const address2 = getAddressFieldValue(AddressField.Address2, addressType) ?? '';

    return [address1, address2].join(' ').trim();
  }

  const fields = getAddressFields(addressType);

  return Object.values(fields).join(' ').trim();
};
