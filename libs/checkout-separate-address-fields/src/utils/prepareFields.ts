import {AddressField, PdkUtil, useCheckoutStore, useUtil} from '@myparcel-pdk/checkout-common';
import {SeparateAddressField} from '../types';
import {fillSeparateAddressFields} from '../listeners';
import {ATTRIBUTE_AUTOCOMPLETE} from '../constants';
import {triggerFormChange} from './triggerFormChange';
import {setFullStreet} from './setFullStreet';

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

    address1Field?.addEventListener('load', fillSeparateAddressFields);
    address1Field?.addEventListener('animationend', fillSeparateAddressFields);

    setFullStreet(addressType, false);
  });

  triggerFormChange();
}
