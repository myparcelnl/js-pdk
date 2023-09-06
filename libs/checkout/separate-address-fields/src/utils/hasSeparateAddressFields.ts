import {AddressField, type AddressType, useSettings, useUtil, Util} from '@myparcel-pdk/checkout-core';

export const hasSeparateAddressFields = (addressType?: AddressType): boolean => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  const settings = useSettings();

  const country = getAddressFieldValue(AddressField.Country, addressType);

  return !!country && settings.countriesWithSeparateAddressFields.includes(country.toUpperCase());
};
