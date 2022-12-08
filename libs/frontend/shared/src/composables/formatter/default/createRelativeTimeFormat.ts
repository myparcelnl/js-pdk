import {IetfLanguageTag} from '@myparcel-pdk/frontend-core';

export const createRelativeTimeFormat = (locale: IetfLanguageTag): Intl.RelativeTimeFormat => {
  return new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
  });
};
