import {describe, expect, it} from 'vitest';
import {type OneOrMore} from '@myparcel/ts-utils';
import {createTestContext} from '../__tests__/createTestContext';
import {resolveStrings} from './resolveStrings';

interface TestInput {
  input: OneOrMore<string>;
  output: string[];
}

describe('resolveStrings', () => {
  it.each([
    {
      input: '{{ outDir }}/src',
      output: ['dist/src'],
    },
    {
      input: '{{outDir}}/src/{{platforms}}',
      output: ['dist/src/myparcelnl', 'dist/src/myparcelbe', 'dist/src/flespakket'],
    },
    {
      input: ['{{outDir}}/src/**/*', '{{tmpDir}}/src'],
      output: ['dist/src/**/*', '.tmp/src'],
    },
    {
      input: '{{phpScoper.outDir}}/src/**/*',
      output: ['.tmp/scoped/source/src/**/*'],
    },
  ] satisfies TestInput[])('resolves strings with $input', ({input, output}) => {
    const result = resolveStrings(createTestContext(), input);

    expect(result).toEqual(output);
  });
});
