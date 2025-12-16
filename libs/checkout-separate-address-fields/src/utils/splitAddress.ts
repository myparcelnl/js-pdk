import {AddressField, type AddressType, PdkUtil, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {type SeparateAddressFields} from '../types';
import {splitFullStreet} from './splitFullStreet';

export const splitAddress = (addressType: AddressType): SeparateAddressFields => {
  const getAddressFieldValue = useUtil(PdkUtil.GetAddressFieldValue);
  const address1 = getAddressFieldValue(AddressField.Address1, addressType) ?? '';
  const address2 = getAddressFieldValue(AddressField.Address2, addressType) ?? '';

  return splitFullStreet([address1, address2].join(' '));
};
