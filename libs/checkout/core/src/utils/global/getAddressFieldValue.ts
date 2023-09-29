import {type AddressField, type AddressType} from '@myparcel-pdk/checkout-common';
import {getFieldValue} from './getFieldValue';

export const getAddressFieldValue = (name: AddressField | string, addressType?: AddressType): undefined | string => {
  return getFieldValue(name, addressType);
};
