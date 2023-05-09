import {AddressType} from '../types';
import {useConfig} from '../config';

export const hasAddressType = (addressType: AddressType): boolean => {
  const config = useConfig();

  return config.hasAddressType(addressType);
};
