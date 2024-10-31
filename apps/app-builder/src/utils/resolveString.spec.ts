import {describe, expect, it} from 'vitest';
import {type StringGenerator} from '../types/common.types';
import {PdkPlatformName} from '../constants';
import {createTestContext} from '../__tests__/createTestContext';
import {resolveString} from './resolveString';
import {addPlatformToContext} from './addPlatformToContext';

describe('resolveString', () => {
  it.each([
    ['{{tmpDir}}/php-scoper', '.tmp/php-scoper'],
    ['{{tmpDir}}/build/{{platform}}', '.tmp/build/myparcelnl'],
    [
      (platform) => `{{tmpDir}}/config/${platform}/translations/${platform}.json`,
      '.tmp/config/myparcelnl/translations/myparcelnl.json',
    ],
  ] satisfies [StringGenerator, string][])('resolves %s to %s', (stringGenerator, expected) => {
    expect(resolveString(stringGenerator, addPlatformToContext(createTestContext(), PdkPlatformName.MyParcelNl))).toBe(
      expected,
    );
  });
});
