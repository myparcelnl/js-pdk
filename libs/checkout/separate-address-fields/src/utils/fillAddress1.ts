import {useCheckoutStore} from '@myparcel-pdk/checkout-core';
import {type AddressType} from '@myparcel-pdk/checkout-common';
import {triggerFormChange} from './triggerFormChange';
import {setFullStreet} from './setFullStreet';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';

export const fillAddress1 = (addressType?: AddressType): void => {
  const checkout = useCheckoutStore();

  const addressTypes = addressType ? [addressType] : checkout.state.addressTypes.filter(hasSeparateAddressFields);

  addressTypes.forEach((addressType) => setFullStreet(addressType, false));

  triggerFormChange();
};
