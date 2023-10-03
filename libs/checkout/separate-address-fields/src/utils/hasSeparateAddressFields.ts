import {useSettings, useUtil, Util} from '@myparcel-pdk/checkout-core';
import {AddressField, type AddressType} from '@myparcel-pdk/checkout-common';

export const hasSeparateAddressFields = (addressType?: AddressType): boolean => {
  const getAddressFieldValue = useUtil(Util.GetAddressFieldValue);

  const settings = useSettings();

  const country = getAddressFieldValue(AddressField.Country, addressType);

  return !!country && settings.countriesWithSeparateAddressFields.includes(country.toUpperCase());
};
