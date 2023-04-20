import {AddressField, AddressType, Util, useUtil} from '@myparcel-pdk/frontend-checkout-core/src';

type DeliveryOptionsAddress = {
  cc?: string;
  postalCode?: string;
  street?: string;
  city?: string;
};

export const getDeliveryOptionsAddress = (type?: AddressType): DeliveryOptionsAddress => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  return {
    cc: getAddressFieldValue(AddressField.Country, type),
    postalCode: getAddressFieldValue(AddressField.PostalCode, type),
    street: getAddressFieldValue(AddressField.Address1, type),
    city: getAddressFieldValue(AddressField.City, type),
  };
};
