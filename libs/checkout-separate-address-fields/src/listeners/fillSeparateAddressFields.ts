import {isOfType} from '@myparcel-dev/ts-utils';
import {type AddressType} from '@myparcel-dev/pdk-checkout-common';
import {fillAddressFields, splitFullStreet} from '../utils';

/**
 * Autofill helper for layout with separate number field.
 * Split street to 3 fields on autofill.
 *
 * @param {Event} event
 * @param {AddressType} [addressType]
 */
export const fillSeparateAddressFields = (event: Event, addressType?: AddressType): void => {
  if (!isOfType<HTMLInputElement>(event.target, 'value')) {
    return;
  }

  fillAddressFields(splitFullStreet(event.target.value), addressType);
};
