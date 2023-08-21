import {ref} from 'vue';
import {describe, expect, it} from 'vitest';
import {type FormInstance, type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type OperationArguments} from '../types';
import {buildFormStateWatcher} from './buildFormStateWatcher';

const createFakeElementInstance = (): InteractiveElementInstance => {
  const createFakeField = (name: string, value: unknown) => {
    return {
      name,
      ref: ref(value),
      component: 'input',
      form: fakeForm,
    } as InteractiveElementInstance;
  };

  const createFakeFields = () => {
    return [createFakeField('field1', 'hi'), createFakeField('field2', false), createFakeField('field3', 12)];
  };

  const fields: InteractiveElementInstance[] = [];

  const fakeForm = {
    name: 'fake',
    getValue(name: string) {
      return fields.find((field) => field.name === name)?.ref.value;
    },
  } as unknown as FormInstance;

  fields.push(...createFakeFields());

  return fields[0];
};

describe('buildFormStateWatcher', () => {
  it('should return a function', () => {
    const result = buildFormStateWatcher({}, '');

    expect(result).toBeInstanceOf(Function);
  });

  it.each([
    {
      $if: [
        {
          $target: 'field3',
          $gt: 2,
        },
      ],
    },
    {
      $if: [
        {
          $target: 'field1',
          $in: ['hi', 'ciao'],
        },
      ],
    },
    {
      $if: [
        {
          $target: 'field2',
          $eq: false,
        },
      ],
    },
    {
      $if: [
        {
          $target: 'field2',
          $eq: false,
        },
        {
          $target: 'field1',
          $in: ['hi', 'ciao'],
        },
      ],
    },
    {
      $if: [
        {
          $and: [
            {
              $target: 'field2',
              $eq: false,
            },
            {
              $target: 'field1',
              $nin: ['bye', 'hello'],
            },
          ],
        },
      ],
    },
    {
      $if: [
        {
          $or: [
            {
              $target: 'field2',
              $eq: true,
            },
            {
              $target: 'field3',
              $gt: 10,
            },
          ],
        },
      ],
    },
    {
      $if: [
        {
          $and: [{$target: 'field1'}, {$target: 'field3'}],
        },
      ],
    },
  ] satisfies OperationArguments[])('should return true if the condition is true', (input) => {
    const result = buildFormStateWatcher(input, '')(createFakeElementInstance());

    expect(result).toBe(true);
  });

  it.each([
    {
      $if: [
        {
          $target: 'field3',
          $lt: 2,
        },
      ],
    },
    {
      $if: [
        {
          $target: 'field1',
          $in: ['bye', 'hello'],
        },
      ],
    },
    {
      $if: [
        {
          $target: 'field2',
          $eq: true,
        },
      ],
    },
    {
      $if: [
        {
          $target: 'field2',
          $eq: true,
        },
        {
          $target: 'field1',
          $in: ['hi', 'ciao'],
        },
      ],
    },
    {
      $if: [
        {
          $and: [
            {
              $target: 'field2',
              $eq: true,
            },
            {
              $target: 'field1',
              $nin: ['hi', 'ciao'],
            },
          ],
        },
      ],
    },

    {
      $if: [
        {
          $or: [
            {
              $target: 'field2',
              $eq: true,
            },
            {
              $target: 'field3',
              $lt: 10,
            },
          ],
        },
      ],
    },
    {
      $if: [
        {
          $and: [{$target: 'field1'}, {$target: 'field2'}],
        },
      ],
    },
  ] satisfies OperationArguments[])('should return false if the condition is false', (input) => {
    const result = buildFormStateWatcher(input, '')(createFakeElementInstance());

    expect(result).toBe(false);
  });
});
