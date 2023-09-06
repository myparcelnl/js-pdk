import {type AddressField, type AddressType} from '../../types';
import {getFieldValue} from './getFieldValue';

export const getAddressFieldValue = (name: AddressField, addressType?: AddressType): undefined | string => {
  return getFieldValue(name, addressType);
};
