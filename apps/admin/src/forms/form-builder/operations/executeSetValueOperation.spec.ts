import {ref} from 'vue';
import {afterEach, describe, expect, it} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {defineForm, MagicForm, useFormBuilder} from '@myparcel/vue-form-builder';
import {type AnyVal} from '../types/common.types';
import {type FormSetValueOperation} from '../types/FormOperations.types';
import {buildAfterUpdate} from '../builders/buildAfterUpdate';

interface TestInput {
  name: string;
  input: FormSetValueOperation[];
  result: Record<string, AnyVal>;
}

const datasets = [
  {
    name: 'simple set',
    input: [
      {
        $setValue: {
          $value: 'hello',
        },
      },
    ],
    result: {
      test: 'hello',
      test2: '',
      test3: '',
    },
  },
  {
    name: 'simple set with target',
    input: [
      {
        $setValue: {
          $value: 'hello',
        },
      },
      {
        $setValue: {
          $value: 'world',
          $target: 'test2',
        },
      },
    ],
    result: {
      test: 'hello',
      test2: 'world',
      test3: '',
    },
  },
  {
    name: 'simple set with target and if',
    input: [
      {
        $setValue: {
          $value: 'bye',
        },
      },
      {
        $setValue: {
          $value: 'see ya',
          $target: 'test2',
          $if: [{$eq: 'hello'}],
        },
      },
      {
        $setValue: {
          $value: 'hello',
          $target: 'test2',
          $if: [{$eq: 'bye'}],
        },
      },
    ],
    result: {
      test: 'bye',
      test2: 'hello',
      test3: '',
    },
  },
  {
    name: 'simple set with target and if not',
    input: [
      {
        $setValue: {
          $value: 10,
        },
      },
      {
        $setValue: {
          $value: 20,
          $target: 'test2',
          $if: [
            {
              $target: 'test',
              $in: [10, 20, 30],
            },
          ],
        },
      },
    ],
    result: {
      test: 10,
      test2: 20,
      test3: '',
    },
  },
  {
    name: 'complex and/or conditions',
    input: [
      {
        $setValue: {
          $value: 10,
        },
      },
      {
        $setValue: {
          $value: 20,
          $target: 'test2',
          $if: [
            {
              $and: [
                {
                  $target: 'test',
                  $gt: 5,
                },
                {
                  $target: 'test',
                  $lt: 30,
                },
              ],
            },
          ],
        },
      },
      {
        $setValue: {
          $value: 45,
          $target: 'test3',
          $if: [
            {
              $or: [
                {
                  $target: 'test2',
                  $gt: 50,
                },
                {
                  $target: 'test2',
                  $lt: 30,
                },
              ],
            },
          ],
        },
      },
    ],
    result: {
      test: 10,
      test2: 20,
      test3: 45,
    },
  },
] satisfies TestInput[];

describe('executeSetValueOperation', () => {
  afterEach(() => {
    useFormBuilder().forms.value = {};
  });

  it.each(datasets)('should set value with $name', async ({input, result}) => {
    expect.assertions(1);

    const form = defineForm('test', {
      fields: [
        {
          name: 'test',
          component: 'input',
          ref: ref(''),
          afterUpdate: buildAfterUpdate(input, ''),
        },
        {
          name: 'test2',
          component: 'input',
          ref: ref(''),
        },
        {
          name: 'test3',
          component: 'input',
          ref: ref(''),
        },
      ],
    });

    mount(MagicForm, {props: {form}});

    form.setValue('test', 'test');

    await flushPromises();

    expect(form.values).toEqual(result);
  });
});
