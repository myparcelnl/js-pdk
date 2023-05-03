import {AddressField, Util, useCheckoutStore, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {ATTRIBUTE_AUTOCOMPLETE} from '../constants';
import {fillAddressFields} from './fillAddressFields';
import {getFullStreet} from './getFullStreet';
import {setAddress} from './setAddress';

/**
 * Set the correct autocomplete attribute on the street fields if none is present.
 */
export function prepareFields(): void {
  const getAddressField = useUtil(Util.GetAddressField);
  const setFieldValue = useUtil(Util.SetFieldValue);

  const checkout = useCheckoutStore();

  checkout.state.addressTypes.forEach((addressType) => {
    const streetField = getAddressField(AddressField.Street, addressType);

    if (!streetField) {
      return;
    }

    const address1Field = getAddressField(AddressField.Address1, addressType);

    if (!streetField?.getAttribute(ATTRIBUTE_AUTOCOMPLETE)) {
      streetField?.setAttribute(ATTRIBUTE_AUTOCOMPLETE, 'street-address');
    }

    address1Field?.addEventListener('load', setAddress);
    address1Field?.addEventListener('animationend', setAddress);

    setFieldValue(AddressField.Address1, getFullStreet(addressType), addressType, false);
  });

  fillAddressFields();
}
