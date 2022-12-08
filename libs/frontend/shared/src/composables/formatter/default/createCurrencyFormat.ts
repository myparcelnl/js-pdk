import {IetfLanguageTag} from '@myparcel-pdk/frontend-core';

export const createCurrencyFormat = (locale: IetfLanguageTag): Intl.NumberFormat => {
  return new Intl.NumberFormat(locale, {
    currency: 'EUR',
    style: 'currency',
  });
};
