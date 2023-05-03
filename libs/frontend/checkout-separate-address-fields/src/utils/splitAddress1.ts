import {AddressField, AddressFields, AddressType, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {splitAddress} from './splitAddress';

export type PartialAddressFields = Pick<
  AddressFields,
  AddressField.Street | AddressField.Number | AddressField.NumberSuffix
>;

export const splitAddress1 = (addressType: AddressType): PartialAddressFields => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  const address = getAddressFieldValue(AddressField.Address1, addressType);

  return splitAddress(address);
};
