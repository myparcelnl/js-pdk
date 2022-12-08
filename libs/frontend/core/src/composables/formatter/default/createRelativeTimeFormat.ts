import {IetfLanguageTag} from '@myparcel-pdk/common';

export const createRelativeTimeFormat = (locale: IetfLanguageTag): Intl.RelativeTimeFormat => {
  return new Intl.RelativeTimeFormat(locale, {
    numeric: 'auto',
  });
};
