import {isOfType} from '@myparcel/ts-utils';
import {fillAddressFields, splitFullStreet} from '../utils';

/**
 * Autofill helper for layout with separate number field.
 * Split street to 3 fields on autofill.
 *
 * @param {Event} event
 */
export const fillSeparateAddressFields = (event: Event): void => {
  if (!isOfType<HTMLInputElement>(event.target, 'value')) {
    return;
  }

  fillAddressFields(splitFullStreet(event.target.value));
};
