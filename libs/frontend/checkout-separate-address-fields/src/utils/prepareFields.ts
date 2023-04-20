import {ADDRESS_TYPES, AddressField, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {setAddress} from './setAddress';

/**
 * Set the correct autocomplete attribute on the street fields if none is present.
 */
export function prepareFields(): void {
  const getAddressField = useUtil(Util.GetAddressField);

  const ATTRIBUTE_AUTOCOMPLETE = 'autocomplete';

  ADDRESS_TYPES.forEach((addressType) => {
    const address1Field = getAddressField(AddressField.Address1, addressType);
    const streetField = getAddressField(AddressField.Street, addressType);

    if (!streetField) {
      return;
    }

    // streetField?.addEventListener('change', () => {
    //   console.log('streetField change');
    //   setFieldValue(FIELD_ADDRESS_1, getFullStreet(addressType), addressType);
    // });
    //
    // numberField?.addEventListener('change', () => {
    //   console.log('numberField change');
    //   setFieldValue(FIELD_ADDRESS_1, getFullStreet(addressType), addressType);
    // });

    if (!streetField?.getAttribute(ATTRIBUTE_AUTOCOMPLETE)) {
      streetField?.setAttribute(ATTRIBUTE_AUTOCOMPLETE, 'street-address');
    }

    address1Field?.addEventListener('load', setAddress);
    address1Field?.addEventListener('animationend', setAddress);

    setAddress({target: address1Field} as Event & {target: HTMLInputElement});
  });
}
