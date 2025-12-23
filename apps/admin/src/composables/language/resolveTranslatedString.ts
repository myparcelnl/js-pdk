import {get} from 'lodash-unified';
import {isOfType} from '@myparcel-dev/ts-utils';
import {useGlobalContext} from '../context';
import {type Translatable} from '../../types';
import {type Replacers} from './types';

export const resolveTranslatedString = (
  translated: string,
  replacers: undefined | Replacers,
  translation: string | Translatable,
): string => {
  const matches = translated.match(/\{[\w.]+}/g);

  if (!matches) {
    return translated;
  }

  const resolvedReplacers = {
    ...useGlobalContext(),
    ...(isOfType<Translatable>(translation, 'args') && translation.args),
    ...replacers,
  };

  return matches.reduce((acc, match) => {
    const replacerKey = match.substring(1, match.length - 1).trim();
    const replacement = get(resolvedReplacers, replacerKey, '');

    return acc.replace(match, String(replacement));
  }, translated);
};
