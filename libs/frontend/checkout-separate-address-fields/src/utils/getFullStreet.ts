import {AddressField, AddressType, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {getAddressFields} from './getAddressFields';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';

export const getFullStreet = (addressType: AddressType): string => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  if (!hasSeparateAddressFields(addressType)) {
    return getAddressFieldValue(AddressField.Address1, addressType) ?? '';
  }

  const fields = getAddressFields(addressType);

  return Object.values(fields).join(' ').trim();
};
