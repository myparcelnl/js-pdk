import {type Translatable} from '@myparcel-pdk/admin-common';

export const resolveTranslationKey = (translation: string | Translatable): string => {
  return typeof translation === 'string' ? translation : translation.key;
};
