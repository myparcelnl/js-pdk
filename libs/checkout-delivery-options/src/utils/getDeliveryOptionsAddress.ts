import {AddressField, type AddressType, PdkUtil, useUtil} from '@myparcel-dev/pdk-checkout-common';
import {type InputDeliveryOptionsConfiguration} from '@myparcel-dev/delivery-options';

export const getDeliveryOptionsAddress = (type?: AddressType): InputDeliveryOptionsConfiguration['address'] => {
  const getAddressFieldValue = useUtil(PdkUtil.GetAddressFieldValue);
  const address1 = getAddressFieldValue(AddressField.Address1, type) ?? '';
  const address2 = getAddressFieldValue(AddressField.Address2, type) ?? '';

  return {
    cc: getAddressFieldValue(AddressField.Country, type) ?? '',
    postalCode: getAddressFieldValue(AddressField.PostalCode, type) ?? '',
    street: [address1, address2].join(' ').trim(),
    city: getAddressFieldValue(AddressField.City, type) ?? '',
  };
};
