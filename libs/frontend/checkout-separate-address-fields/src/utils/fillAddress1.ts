import {AddressType, useCheckoutStore} from '@myparcel-pdk/frontend-checkout-core';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';
import {setFullStreet} from './setFullStreet';
import {triggerFormChange} from './triggerFormChange';

export const fillAddress1 = (addressType?: AddressType): void => {
  const checkout = useCheckoutStore();

  const addressTypes = addressType ? [addressType] : checkout.state.addressTypes.filter(hasSeparateAddressFields);

  addressTypes.forEach((addressType) => setFullStreet(addressType, false));

  triggerFormChange();
};
