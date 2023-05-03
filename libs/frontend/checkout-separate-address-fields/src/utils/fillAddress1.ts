import {AddressField, AddressType, Util, useCheckoutStore, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';
import {fillAddressFields} from './fillAddressFields';
import {getFullStreet} from './getFullStreet';
import {hasSeparateAddressFields} from './hasSeparateAddressFields';

export const fillAddress1 = (addressType?: AddressType): void => {
  const checkout = useCheckoutStore();

  const setFieldValue = useUtil(Util.SetFieldValue);

  const addressTypes = addressType ? [addressType] : checkout.state.addressTypes.filter(hasSeparateAddressFields);

  addressTypes.forEach((addressType) => {
    setFieldValue(AddressField.Address1, getFullStreet(addressType), addressType, false);
  });

  fillAddressFields();
};
