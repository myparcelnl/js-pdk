import {type AddressType, useCheckoutStore} from '@myparcel-pdk/frontend-checkout-core';
import {triggerFormChange} from './triggerFormChange';
import {setFullStreet} from './setFullStreet';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';

export const fillAddress1 = (addressType?: AddressType): void => {
  const checkout = useCheckoutStore();

  const addressTypes = addressType ? [addressType] : checkout.state.addressTypes.filter(hasSeparateAddressFields);

  addressTypes.forEach((addressType) => setFullStreet(addressType, false));

  triggerFormChange();
};
