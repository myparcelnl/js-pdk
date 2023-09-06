import {describe, expect, it} from 'vitest';
import {validateId} from './validateId';

describe('validateId', () => {
  it('should throw an error when no id is provided', () => {
    expect(() => validateId()).toThrowError('no id provided');
  });

  it('should throw an error when id is an array and canBeArray is not true', () => {
    expect(() => validateId(['1', '2'])).toThrowError('id cannot be an array');
  });

  it('should return the id when it is a string', () => {
    expect(validateId('1')).toBe('1');
  });

  it('should return the id when it is an array and canBeArray is true', () => {
    expect(validateId(['1', '2'], true)).toEqual(['1', '2']);
  });
});
