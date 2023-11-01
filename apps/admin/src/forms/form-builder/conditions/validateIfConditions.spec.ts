import {describe, expect, it} from 'vitest';
import {type IfAndMatcher} from '../types';
import {validateIfConditions} from './validateIfConditions';

describe('validateIfConditions', () => {
  it('should return true if no conditions are passed', () => {
    const result = validateIfConditions({}, () => '');

    expect(result).toBe(true);
  });

  it('should return true if the condition is true', () => {
    const result = validateIfConditions(
      {
        $if: [
          {
            $target: 'field1',
            $eq: true,
          },
        ],
      },
      () => true,
    );

    expect(result).toBe(true);
  });

  it('should return false if the condition is false', () => {
    const result = validateIfConditions(
      {
        $if: [
          {
            $target: 'field1',
            $eq: true,
          },
        ],
      },
      () => false,
    );

    expect(result).toBe(false);
  });

  it.each([[true], [1], ['hello']])(
    'should return true if only a target is passed and its value is truthy (%s)',
    (value) => {
      const result = validateIfConditions({$target: 'field1'}, () => value);

      expect(result).toBe(true);
    },
  );

  it.each([
    {
      $and: [
        {
          $target: 'field1',
          $eq: true,
        },
        {
          $target: 'field2',
          $eq: true,
        },
      ],
    },
    {
      $and: [
        {
          $target: 'field1',
          $ne: false,
        },
        {
          $target: 'field2',
          $eq: true,
        },
      ],
    },
    {
      $and: [{$target: 'field1'}, {$target: 'field3'}],
    },
  ] satisfies IfAndMatcher[])('should return true if all and conditions are true', ($and) => {
    const result = validateIfConditions({$if: [$and]}, () => true);

    expect(result).toBe(true);
  });

  it.each([
    {
      $and: [
        {
          $target: 'field1',
          $eq: true,
        },
        {
          $target: 'field2',
          $eq: false,
        },
      ],
    },
    {
      $and: [
        {
          $target: 'field1',
          $eq: true,
        },
        {$target: 'field2'},
      ],
    },
    {
      $and: [
        {
          $target: 'field1',
          $ne: false,
        },
        {
          $target: 'field3',
          $ne: false,
        },
      ],
    },
  ] satisfies IfAndMatcher[])('should return false if any and condition is false', ($and) => {
    const result = validateIfConditions({$if: [$and]}, () => false);

    expect(result).toBe(false);
  });

  it('should return true if one or condition is true', () => {
    const result = validateIfConditions(
      {
        $if: [
          {
            $or: [
              {
                $target: 'field1',
                $eq: true,
              },
              {
                $target: 'field2',
                $eq: true,
              },
            ],
          },
        ],
      },
      () => true,
    );

    expect(result).toBe(true);
  });

  it('should return false if all or conditions are false', () => {
    const result = validateIfConditions(
      {
        $if: [
          {
            $or: [
              {
                $target: 'field1',
                $eq: true,
              },
              {
                $target: 'field2',
                $eq: true,
              },
            ],
          },
        ],
      },
      () => false,
    );

    expect(result).toBe(false);
  });

  it('should return true if all and and or conditions are true', () => {
    const result = validateIfConditions(
      {
        $if: [
          {
            $and: [
              {
                $target: 'field1',
                $eq: true,
              },
            ],
          },
          {
            $or: [
              {
                $target: 'field2',
                $eq: true,
              },
              {
                $target: 'field3',
                $eq: true,
              },
            ],
          },
        ],
      },
      () => true,
    );

    expect(result).toBe(true);
  });

  it('should return false if one and and or condition is false', () => {
    const result = validateIfConditions(
      {
        $if: [
          {
            $and: [
              {
                $target: 'field1',
                $eq: true,
              },
            ],
          },
          {
            $or: [
              {
                $target: 'field2',
                $eq: true,
              },
              {
                $target: 'field3',
                $eq: true,
              },
            ],
          },
        ],
      },
      () => false,
    );

    expect(result).toBe(false);
  });
});
