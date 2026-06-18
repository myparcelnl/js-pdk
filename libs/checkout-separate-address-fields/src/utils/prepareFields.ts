import {AddressField, PdkUtil, useCheckoutStore, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {fillSeparateAddressFields} from '../listeners';
import {SeparateAddressField} from '../constants';
import {triggerFormChange} from './triggerFormChange';
import {setFullStreet} from './setFullStreet';
import {fillAddressFields} from './fillAddressFields';
import {splitFullStreet} from './splitFullStreet';

export function prepareFields(): void {
  const getAddressField = useUtil(PdkUtil.GetAddressField);

  const checkout = useCheckoutStore();

  checkout.state.addressTypes.forEach((addressType) => {
    const streetField = getAddressField(SeparateAddressField.Street, addressType);

    if (!streetField) {
      return;
    }

    const address1Field = getAddressField(AddressField.Address1, addressType);

    address1Field?.addEventListener('load', (event) => fillSeparateAddressFields(event, addressType));
    address1Field?.addEventListener('animationend', (event) => fillSeparateAddressFields(event, addressType));

    // If the street field already contains a full address (e.g. from browser autofill that fired
    // before this code ran), split it immediately rather than letting the combined value persist.
    const currentStreet = streetField.value;

    if (currentStreet) {
      const parsed = splitFullStreet(currentStreet);

      if (parsed[SeparateAddressField.Number]) {
        fillAddressFields(parsed, addressType);
        return;
      }
    }

    setFullStreet(addressType, false);
  });

  triggerFormChange();
}
