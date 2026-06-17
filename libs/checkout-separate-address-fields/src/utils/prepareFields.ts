import {isOfType} from '@myparcel-dev/ts-utils';
import {AddressField, PdkUtil, useCheckoutStore, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {fillSeparateAddressFields} from '../listeners';
import {ATTRIBUTE_AUTOCOMPLETE, SeparateAddressField} from '../constants';
import {triggerFormChange} from './triggerFormChange';
import {setFullStreet} from './setFullStreet';
import {fillAddressFields} from './fillAddressFields';
import {splitFullStreet} from './splitFullStreet';

/**
 * Set the correct autocomplete attribute on the street fields if none is present.
 */
export function prepareFields(): void {
  const getAddressField = useUtil(PdkUtil.GetAddressField);

  const checkout = useCheckoutStore();

  checkout.state.addressTypes.forEach((addressType) => {
    const streetField = getAddressField(SeparateAddressField.Street, addressType);

    if (!streetField) {
      return;
    }

    const address1Field = getAddressField(AddressField.Address1, addressType);

    if (!streetField?.getAttribute(ATTRIBUTE_AUTOCOMPLETE)) {
      streetField?.setAttribute(ATTRIBUTE_AUTOCOMPLETE, 'street-address');
    }

    address1Field?.addEventListener('load', (event) => fillSeparateAddressFields(event, addressType));
    address1Field?.addEventListener('animationend', (event) => fillSeparateAddressFields(event, addressType));

    // When the street field receives a full address (e.g. via browser autofill), split it.
    streetField.addEventListener('change', (event) => {
      if (!isOfType<HTMLInputElement>(event.target, 'value')) {
        return;
      }
      const parsed = splitFullStreet(event.target.value);
      if (parsed[SeparateAddressField.Number]) {
        fillAddressFields(parsed, addressType);
      }
    });

    setFullStreet(addressType, false);
  });

  triggerFormChange();
}
