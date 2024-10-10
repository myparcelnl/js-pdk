import {describe, expect, it} from 'vitest';
import {TriState} from '@myparcel-pdk/common';
import {booleanToTriState} from './booleanToTriState';

describe('booleanToTriState', () => {
  it.each([
    [true, TriState.On],
    [false, TriState.Off],
    [undefined, TriState.Off],
  ])('should return %s for %s', (value, expected) => {
    expect(booleanToTriState(value)).toEqual(expected);
  });
});
