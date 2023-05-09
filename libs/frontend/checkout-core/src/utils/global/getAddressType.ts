import {AddressType} from '../../types';
import {hasAddressType} from '../hasAddressType';

export const getAddressType = (): AddressType => {
  return hasAddressType(AddressType.Billing) ? AddressType.Billing : AddressType.Shipping;
};
