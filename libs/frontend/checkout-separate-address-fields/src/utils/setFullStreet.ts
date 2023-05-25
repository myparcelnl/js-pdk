import {AddressField, AddressType, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {getFullStreet} from './getFullStreet';

export const setFullStreet = (addressType: AddressType, dispatchEvent = true): void => {
  const setFieldValue = useUtil(Util.SetFieldValue);

  const fullStreet = getFullStreet(addressType);

  setFieldValue(AddressField.Address1, fullStreet, addressType, dispatchEvent);
};
