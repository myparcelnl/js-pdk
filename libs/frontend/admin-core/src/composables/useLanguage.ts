import {Ref, ref} from 'vue';
import {get, memoize} from 'lodash-unified';
import {createGlobalState} from '@vueuse/core';
import {decodeHtmlEntities} from '../utils';
import {globalLogger} from '../services';
import {useGlobalContext} from './context';

type Replacers = Record<string, unknown | Record<string, unknown>>;

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
  translate(key?: string, replacers?: Replacers): string;
};

/**
 * Cached translations.
 */
const useCache = createGlobalState<Record<string, string>>(() => ({}));

/**
 * Keys that are missing in the translation file.
 */
const useMissingKeys = createGlobalState<Ref<string[]>>(() => ref([]));

const all: UseLanguage['all'] = () => {
  const {translations} = useGlobalContext();

  if (!translations) {
    globalLogger.warn('Translations not found.');
  }

  return translations;
};

const has: UseLanguage['has'] = (key) => {
  const translations = memoizedAll();

  return translations && key in translations;
};

const translate: UseLanguage['translate'] = (key, replacers) => {
  if (!key) {
    return '';
  }

  const cache = useCache();

  if (memoizedHas(key)) {
    if (!cache.hasOwnProperty(key)) {
      const translations = memoizedAll();
      const translated = decodeHtmlEntities(translations[key]);

      const matches = translated.match(/\{[\w.]+}/g);

      if (matches) {
        replacers ??= useGlobalContext();

        cache[key] = matches.reduce((acc, match) => {
          const replacerKey = match.substring(1, match.length - 1).trim();
          const replacement = get(replacers, replacerKey, '');

          return acc.replace(match, String(replacement));
        }, translated);
      } else {
        cache[key] = translated;
      }
    }
  } else {
    const missingKeys = useMissingKeys();
    // eslint-disable-next-line no-console
    globalLogger.warn(`Missing translation: ${key}`);
    missingKeys.value.push(key);
    cache[key] = key;
  }

  return cache[key];
};

const memoizedAll = memoize(all);
const memoizedHas = memoize(has);
const memoizedTranslate = memoize(translate);

export const useLanguage = (): UseLanguage => {
  const missingKeys = useMissingKeys();

  return {
    missingKeys,

    all: memoizedAll,
    has: memoizedHas,
    translate: memoizedTranslate,
  };
};
