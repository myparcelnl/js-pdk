import {createRegExp} from './createRegExp';
import {REPLACEMENT_EXCEPTIONS} from './consts';

const occurrencesCache: Record<string, RegExpMatchArray | never[]> = {};

export const getOccurrences = (input: string, search: string): RegExpMatchArray | never[] => {
  if (!occurrencesCache[input]) {
    const regExp = createRegExp(search, REPLACEMENT_EXCEPTIONS);

    occurrencesCache[input] = input.match(regExp) ?? [];
  }

  return occurrencesCache[input];
};
