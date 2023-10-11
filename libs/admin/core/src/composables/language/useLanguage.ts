import {type Ref, ref} from 'vue';
import {createGlobalState, useMemoize} from '@vueuse/core';
import {type NonTranslatable, type Translation} from '@myparcel-pdk/admin-common';
import {isOfType} from '@myparcel/ts-utils';
import {useGlobalContext} from '../context';
import {decodeHtmlEntities} from '../../utils';
import {globalLogger} from '../../services';
import {type Replacers} from './types';
import {resolveTranslationKey} from './resolveTranslationKey';
import {resolveTranslatedString} from './resolveTranslatedString';

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
  has(key: Translation | undefined): boolean;

  /**
   * Translate a string into the current language.
   */
  translate(key?: Translation, replacers?: Replacers): string;
};

/**
 * Cached translations.
 */
const useCache = createGlobalState<() => Map<string, string>>(() => new Map());

/**
 * Keys that are missing in the translation file.
 */
const useMissingKeys = createGlobalState<() => Ref<string[]>>(() => ref([]));

const all: UseLanguage['all'] = () => {
  const {translations} = useGlobalContext();

  if (!translations) {
    globalLogger.warn('Translations not found.');
  }

  return translations;
};

const has: UseLanguage['has'] = (translation) => {
  if (!translation) {
    return false;
  }

  if (isOfType<NonTranslatable>(translation, 'text')) {
    return true;
  }

  const translations = memoizedAll();

  return Boolean(translation && translations && resolveTranslationKey(translation) in translations);
};

const translate: UseLanguage['translate'] = (translation, replacers) => {
  if (!translation) {
    return '';
  }

  if (isOfType<NonTranslatable>(translation, 'text')) {
    return translation.text;
  }

  const translationKey = resolveTranslationKey(translation);

  const cache = useCache();

  if (memoizedHas(translationKey)) {
    if (!cache.has(translationKey)) {
      const translations = memoizedAll();
      const translated = decodeHtmlEntities(translations[translationKey]);

      cache.set(translationKey, resolveTranslatedString(translated, replacers, translation));
    }
  } else {
    const missingKeys = useMissingKeys();
    // eslint-disable-next-line no-console
    globalLogger.warn(`Missing translation: ${translationKey}`);
    missingKeys.value.push(translationKey);
    cache.set(translationKey, translationKey);
  }

  return cache.get(translationKey) as string;
};

const memoizedAll = useMemoize(all);
const memoizedHas = useMemoize(has);
const memoizedTranslate = useMemoize(translate);

export const useLanguage = (): UseLanguage => {
  const missingKeys = useMissingKeys();

  return {
    missingKeys,

    all: memoizedAll,
    has: memoizedHas,
    translate: memoizedTranslate,
  };
};
