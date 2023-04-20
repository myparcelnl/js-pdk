import {useSettingsStore} from '@myparcel-pdk/frontend-checkout-core/src';

export const hasSeparateAddressFields = (country?: string): boolean => {
  const settings = useSettingsStore();

  if (!settings.state.separateAddressFieldsEnabled) {
    return false;
  }

  return !!country && settings.state.separateAddressFieldsCountries.includes(country.toUpperCase());
};
