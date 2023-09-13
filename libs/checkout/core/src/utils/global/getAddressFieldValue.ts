import {type AddressField, type AddressType} from '../../types';
import {getFieldValue} from './getFieldValue';

export const getAddressFieldValue = (name: AddressField | string, addressType?: AddressType): undefined | string => {
  return getFieldValue(name, addressType);
};
