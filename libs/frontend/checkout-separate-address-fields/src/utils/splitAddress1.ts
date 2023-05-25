import {AddressField, AddressType, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core';
import {SeparateAddressFields} from '../types';
import {splitFullStreet} from './splitFullStreet';

export const splitAddress1 = (addressType: AddressType): SeparateAddressFields => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  const address = getAddressFieldValue(AddressField.Address1, addressType);

  return splitFullStreet(address);
};
