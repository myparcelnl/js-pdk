import {IetfLanguageTag} from '@myparcel-pdk/frontend-core';

export const createLongDateFormat = (locale: IetfLanguageTag): Intl.DateTimeFormat => {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
