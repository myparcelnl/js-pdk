import {getOccurrences} from './getOccurrences';
import {createRegExp} from './createRegExp';
import {REPLACEMENT_EXCEPTIONS} from './consts';

const caseSensitiveMatcher = (input: string, output: string) =>
  [...output]
    .map((outputChar, i) => {
      const inputChar = input.charAt(i);

      return inputChar === inputChar.toUpperCase() ? outputChar.toUpperCase() : outputChar.toLowerCase();
    })
    .join('');

/**
 * Replaces all occurrences of a string with another string, case-sensitive
 */
export const replaceCaseSensitive = (input: string, search: string, replace: string): string => {
  const res = getOccurrences(input, search);
  let output = input;

  if (res?.[0]) {
    const regExp = createRegExp(search, REPLACEMENT_EXCEPTIONS);

    output = input.replace(regExp, (search) => caseSensitiveMatcher(search, replace));
  }

  return output;
};
