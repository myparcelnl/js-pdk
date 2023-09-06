import {describe, expect, it} from 'vitest';
import {resolveCarrier} from './resolveCarrier';

describe('resolveCarrier', () => {
  it.each([
    ['postnl:identifier', 'postnl'],
    ['carrier', 'carrier'],
  ])('resolves the carrier name', (input, expected) => {
    expect(resolveCarrier(input)).toBe(expected);
  });
});
