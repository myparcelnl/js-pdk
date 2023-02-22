/* eslint-disable no-useless-escape */
// noinspection RegExpUnnecessaryNonCapturingGroup

const caseSensitiveMatcher = (input: string, output: string) =>
  [...output]
    .map((outputChar, i) => {
      const inputChar = input.charAt(i);

      if (inputChar === inputChar.toUpperCase()) {
        return outputChar.toUpperCase();
      }

      return outputChar.toLowerCase();
    })
    .join('');

/**
 * Replaces all occurrences of a string with another string, case-sensitive
 */
export const replaceCaseSensitive = (input: string, search: string, replace: string): string => {
  const res = new RegExp(search, 'gmi').exec(input);
  let output = input;

  if (res?.[0]) {
    const regExp = new RegExp(`${search}(?!\(?:Pdk|Sdk|DevTools))`, 'igm');

    output = input.replace(regExp, (search) => caseSensitiveMatcher(search, replace));
  }

  return output;
};
