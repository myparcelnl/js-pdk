import {describe, expect, it} from 'vitest';
import {TriState} from '../data';
import {triStateToBoolean} from './triStateToBoolean';

describe('triStateToBoolean', () => {
  it.each([
    [TriState.Off, false],
    [TriState.On, true],
    [TriState.Inherit, false],
  ])('should return %s for %s', (value, expected) => {
    expect(triStateToBoolean(value)).toEqual(expected);
  });
});
