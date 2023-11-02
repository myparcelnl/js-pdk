import {AddressField, type AddressType, PdkUtil, useSettings, useUtil} from '@myparcel-pdk/checkout-common';

export const hasSeparateAddressFields = (addressType?: AddressType): boolean => {
  const getAddressFieldValue = useUtil(PdkUtil.GetAddressFieldValue);

  const settings = useSettings();

  const country = getAddressFieldValue(AddressField.Country, addressType);

  return !!country && settings.countriesWithSeparateAddressFields.includes(country.toUpperCase());
};
