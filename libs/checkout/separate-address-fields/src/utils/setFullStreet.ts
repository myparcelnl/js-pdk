import {AddressField, type AddressType, useUtil, Util} from '@myparcel-pdk/checkout-core';
import {getFullStreet} from './getFullStreet';

export const setFullStreet = (addressType: AddressType, dispatchEvent = true): void => {
  const setFieldValue = useUtil(Util.SetFieldValue);

  const fullStreet = getFullStreet(addressType);

  setFieldValue(AddressField.Address1, fullStreet, addressType, dispatchEvent);
};
