import {decodeHtmlEntities} from '../../utils';
import {memoize} from 'lodash-unified';
import {useContextStore} from '../../stores';
import {useLogger} from '../useLogger';

type UseTranslate = () => (key: string) => string;

/**
 * Cached translations.
 *
 * @type {Object}
 */
const cache: Record<string, string> = {};

let warned = false;

const memoizedTranslate = memoize((key: string) => {
  if (!key) {
    return '';
  }

  let translated = key;

  const contextStore = useContextStore();
  const translations = contextStore?.context?.global?.translations;

  const logger = useLogger();

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
});

export const useTranslate: UseTranslate = () => {
  return memoizedTranslate;
};
