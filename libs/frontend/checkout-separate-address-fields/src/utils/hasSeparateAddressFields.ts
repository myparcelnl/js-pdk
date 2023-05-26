import {AddressField, type AddressType, Util, useSettings, useUtil} from '@myparcel-pdk/frontend-checkout-core';

export const hasSeparateAddressFields = (addressType?: AddressType): boolean => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  const settings = useSettings();

  const country = getAddressFieldValue(AddressField.Country, addressType);

  return !!country && settings.countriesWithSeparateAddressFields.includes(country.toUpperCase());
};
