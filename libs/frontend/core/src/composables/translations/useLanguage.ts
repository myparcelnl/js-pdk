import {Ref, ref} from 'vue';
import {decodeHtmlEntities} from '../../utils';
import {memoize} from 'lodash-unified';
import {useContextStore} from '../../stores';
import {useLogger} from '../useLogger';

type UseLanguage = {
  /**
   * A list of all invalid keys that were passed to translate().
   */
  missingKeys: Ref<string[]>;

  /**
   * Get all translations.
   */
  all(): Record<string, string>;

  /**
   * Check if a given translation key exists.
   */
  has(key: string): boolean;

  /**
   * Translate a string into the current language.
   */
  translate(key: string): string;
};

/**
 * Cached translations.
 */
const cache: Record<string, string> = {};

/**
 * Keys that are missing in the translation file.
 */
let missingKeys: Ref<string[]>;

const memoizedHas = memoize((key: string) => {
  const translations = memoizedGetTranslations();

  return translations && key in translations;
});

const memoizedTranslate = memoize((key: string) => {
  if (!key) {
    return '';
  }

  let translated = key;

  if (memoizedHas(key)) {
    if (!cache.hasOwnProperty(key)) {
      const translations = memoizedGetTranslations();

      cache[key] = decodeHtmlEntities(translations[key]);
    }

    translated = cache[key];
  } else {
    const logger = useLogger();
    // eslint-disable-next-line no-console
    logger.warn(`Missing translation: ${key}`);
    missingKeys.value.push(key);
  }

  return translated;
});

const memoizedGetTranslations = memoize(() => {
  const contextStore = useContextStore();
  const translations = contextStore?.context?.global?.translations;

  if (!translations) {
    const logger = useLogger();

    logger.warn('GlobalContext.translations is missing.');
  }

  return translations;
});

export const useLanguage = (): UseLanguage => {
  missingKeys ??= ref([]);

  return {
    missingKeys,

    all: memoizedGetTranslations,
    has: memoizedHas,
    translate: memoizedTranslate,
  };
};
