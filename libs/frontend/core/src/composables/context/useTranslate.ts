import {decodeHtmlEntities, logger} from '@myparcel-pdk/frontend-shared';
import {useContextStore} from '../../stores';

type UseTranslate = () => (key: string) => string;

/**
 * Cached translations.
 *
 * @type {Object}
 */
const cache: Record<string, string> = {};

let warned = false;

const memoizedTranslate = (key: string) => {
  if (!key) {
    return '';
  }

  let translated = key;

  const contextStore = useContextStore();
  const translations = contextStore?.context?.global?.translations;

  if (!translations && !warned) {
    // eslint-disable-next-line no-console
    logger.warn('GlobalContext.translations is missing.');
    warned = true;
  }

  if (translations && key in translations) {
    if (!cache.hasOwnProperty(key)) {
      cache[key] = decodeHtmlEntities(translations[key]);
    }

    translated = cache[key];
  } else {
    // eslint-disable-next-line no-console
    logger.warn(`Missing translation: ${key}`);
  }

  return translated;
};

export const useTranslate: UseTranslate = () => {
  return memoizedTranslate;
};
