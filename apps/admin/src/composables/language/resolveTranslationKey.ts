import {type Translatable} from '../../types';

export const resolveTranslationKey = (translation: string | Translatable): string => {
  return typeof translation === 'string' ? translation : translation.key;
};
