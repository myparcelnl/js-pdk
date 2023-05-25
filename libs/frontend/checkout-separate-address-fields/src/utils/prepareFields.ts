import {AddressField, Util, useCheckoutStore, useUtil} from '@myparcel-pdk/frontend-checkout-core';
import {ATTRIBUTE_AUTOCOMPLETE} from '../constants';
import {SeparateAddressField} from '../types';
import {fillSeparateAddressFields} from '../listeners/fillSeparateAddressFields';
import {setFullStreet} from './setFullStreet';
import {triggerFormChange} from './triggerFormChange';

/**
 * Set the correct autocomplete attribute on the street fields if none is present.
 */
export function prepareFields(): void {
  const getAddressField = useUtil(Util.GetAddressField);

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

    address1Field?.addEventListener('load', fillSeparateAddressFields);
    address1Field?.addEventListener('animationend', fillSeparateAddressFields);

    setFullStreet(addressType, false);
  });

  triggerFormChange();
}
