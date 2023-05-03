import {AddressType} from '../types';
import {getElement} from './global/getElement';
import {useConfig} from '../config';

/**
 * Checks if the inner wrapper of an address type form exists to determine if the address type is available.
 *
 * Does not check the outer div (.woocommerce-shipping-fields) because when the shipping form does not exist, it's
 *  still rendered on the page.
 */
export const hasAddressType = (addressType: AddressType): boolean => {
  const config = useConfig();

  const element = getElement(config.selectors.hasAddressType.replace('%s', addressType));

  return Boolean(element);
};
