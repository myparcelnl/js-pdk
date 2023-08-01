import {describe, expect, it} from 'vitest';
import {validateOrderId} from './validateOrderId';

describe('validateOrderId', () => {
  it('should throw an error when no order id is provided', () => {
    expect(() => validateOrderId()).toThrowError('no order id provided');
  });

  it('should throw an error when order id is an array and canBeArray is not true', () => {
    expect(() => validateOrderId(['1', '2'])).toThrowError('order id cannot be an array');
  });

  it('should return the order id when it is a string', () => {
    expect(validateOrderId('1')).toBe('1');
  });

  it('should return the order id when it is an array and canBeArray is true', () => {
    expect(validateOrderId(['1', '2'], true)).toEqual(['1', '2']);
  });
});
