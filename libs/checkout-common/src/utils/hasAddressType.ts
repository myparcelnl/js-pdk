import {type AddressType} from '../data/address';
import {useConfig} from './useConfig';

export const hasAddressType = (addressType: AddressType): boolean => {
  const config = useConfig();

  return config.hasAddressType(addressType);
};
