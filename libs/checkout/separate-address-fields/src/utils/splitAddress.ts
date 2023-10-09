import {useUtil, Util} from '@myparcel-pdk/checkout-core';
import {AddressField, type AddressType} from '@myparcel-pdk/checkout-common';
import {type SeparateAddressFields} from '../types';
import {splitFullStreet} from './splitFullStreet';

export const splitAddress = (addressType: AddressType): SeparateAddressFields => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);
  const address1 = getAddressFieldValue(AddressField.Address1, addressType) ?? '';
  const addres2 = getAddressFieldValue(AddressField.Address2, addressType) ?? '';

  return splitFullStreet([address1, addres2].join(' '));
};
