import {describe, expect, it} from 'vitest';
import {TriState} from '../data';
import {toTriState} from './toTriState';

describe('toTriStateValue', () => {
  it.each([
    [undefined, TriState.Off],
    [null, TriState.Off],
    [false, TriState.Off],
    [true, TriState.On],
    [TriState.Off, TriState.Off],
    [TriState.On, TriState.On],
    [TriState.Inherit, TriState.Inherit],
  ])('should return %s for %s', (value, expected) => {
    expect(toTriState(value)).toEqual(expected);
  });
});
