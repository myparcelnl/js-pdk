import {fillAddressFields} from './fillAddressFields';
import {isOfType} from '@myparcel/ts-utils';
import {splitAddress} from './splitAddress';

/**
 * Autofill helper for layout with separate number field.
 * Split street to 3 fields on autofill.
 *
 * @param {Event} event
 */
export const setAddress = (event: Event): void => {
  if (!isOfType<HTMLInputElement>(event.target, 'value')) {
    return;
  }

  fillAddressFields(splitAddress(event.target.value));
};
