import {useUtil, Util} from '@myparcel-pdk/checkout-core';
import {AddressField, type AddressType} from '@myparcel-pdk/checkout-common';
import {type SeparateAddressFields} from '../types';
import {splitFullStreet} from './splitFullStreet';

export const splitAddress1 = (addressType: AddressType): SeparateAddressFields => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  const address = getAddressFieldValue(AddressField.Address1, addressType);

  return splitFullStreet(address);
};
