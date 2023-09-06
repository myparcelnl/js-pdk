import {describe, expect, it} from 'vitest';
import {validateIfCondition} from './validateIfCondition';

describe('validateIfCondition', () => {
  it.each([
    ['hi', 'hi', true],
    ['hi', 'ciao', false],
  ])('should return %s === %s', (value, $eq, expected) => {
    expect(validateIfCondition({$eq}, () => value)).toBe(expected);
  });

  it.each([
    [10, 5, true],
    [10, 10, false],
  ])('should return %s > %s', (value, $gt, expected) => {
    expect(validateIfCondition({$gt}, () => value)).toBe(expected);
  });

  it.each([
    [10, 5, true],
    [10, 10, true],
    [10, 15, false],
  ])('should return %s >= %s', (value, $gte, expected) => {
    expect(validateIfCondition({$gte}, () => value)).toBe(expected);
  });

  it.each([
    ['hi', ['hi', 'ciao'], true],
    ['hi', ['ciao', 'bye'], false],
  ])('should return %s in %s', (value, $in, expected) => {
    expect(validateIfCondition({$in}, () => value)).toBe(expected);
  });

  it.each([
    [5, 10, true],
    [10, 10, false],
  ])('should return %s < %s', (value, $lt, expected) => {
    expect(validateIfCondition({$lt}, () => value)).toBe(expected);
  });

  it.each([
    [5, 10, true],
    [10, 10, true],
    [15, 10, false],
  ])('should return %s <= %s', (value, $lte, expected) => {
    expect(validateIfCondition({$lte}, () => value)).toBe(expected);
  });

  it.each([
    ['hi', 'ciao', true],
    ['hi', 'hi', false],
  ])('should return %s !== %s', (value, $ne, expected) => {
    expect(validateIfCondition({$ne}, () => value)).toBe(expected);
  });

  it.each([
    ['hi', ['ciao', 'bye'], true],
    ['hi', ['hi', 'bye'], false],
  ])('should return %s not in %s', (value, $nin, expected) => {
    expect(validateIfCondition({$nin}, () => value)).toBe(expected);
  });

  it.each([
    ['hi', 'ciao', true],
    ['hi', 'hi', false],
  ])('should return %s !== %s', (value, $ne, expected) => {
    expect(validateIfCondition({$ne}, () => value)).toBe(expected);
  });
});
