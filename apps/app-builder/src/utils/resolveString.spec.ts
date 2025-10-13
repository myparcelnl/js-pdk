import {describe, expect, it} from 'vitest';
import {createTestContext} from '../__tests__/createTestContext';
import {resolveString} from './resolveString';

describe('resolveString', () => {
  it.each([
    ['{{tmpDir}}/php-scoper', '.tmp/php-scoper'],
    ['{{tmpDir}}/build/{{name}}', '.tmp/build/test'],
  ])('resolves %s to %s', (stringGenerator, expected) => {
    expect(resolveString(stringGenerator, createTestContext())).toBe(expected);
  });
});
