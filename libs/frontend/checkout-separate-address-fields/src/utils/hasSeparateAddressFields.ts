import {useSettingsStore} from '@myparcel-pdk/frontend-checkout-core/src';

export const hasSeparateAddressFields = (country?: string): boolean => {
  const settings = useSettingsStore();

  return !!country && settings.state.countriesWithSeparateAddressFields.includes(country.toUpperCase());
};
