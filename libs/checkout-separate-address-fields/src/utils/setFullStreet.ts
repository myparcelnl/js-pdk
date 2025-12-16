import {AddressField, type AddressType, PdkUtil, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {getFullStreet} from './getFullStreet';

export const setFullStreet = (addressType: AddressType, dispatchEvent = true): void => {
  const setFieldValue = useUtil(PdkUtil.SetFieldValue);

  const fullStreet = getFullStreet(addressType);

  setFieldValue(AddressField.Address1, fullStreet, addressType, dispatchEvent);
};
