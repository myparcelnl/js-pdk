import {ref} from 'vue';
import {afterEach, describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {defineForm, MagicForm, useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {type FormSetPropOperation, type PropVal} from '../types';
import {buildAfterUpdate} from '../builders';

interface TestInput {
  name: string;
  input: FormSetPropOperation[];
  result: Record<string, Record<string, PropVal>>;
}

const datasets = [
  {
    name: 'set prop',
    input: [
      {
        $setProp: {
          $prop: 'options',
          $value: 'hello',
        },
      },
    ],
    result: {
      aardbei: {
        options: 'hello',
      },
      banaan: {
        subtext: 'world',
      },
      appel: {},
    },
  },
  {
    name: 'set prop on target',
    input: [
      {
        $setProp: {
          $target: 'banaan',
          $prop: 'subtext',
          $value: 'hello',
        },
      },
    ],
    result: {
      aardbei: {},
      banaan: {
        subtext: 'hello',
      },
      appel: {},
    },
  },
  {
    name: 'set prop on target with condition',
    input: [
      {
        $setProp: {
          $target: 'appel',
          $prop: 'options',
          $value: [
            {
              value: 'hello',
              label: 'Hello',
            },
          ],
          $if: [
            {
              $target: 'banaan',
              $ne: 'hi',
            },
          ],
        },
      },
    ],
    result: {
      aardbei: {},
      banaan: {
        subtext: 'world',
      },
      appel: {
        options: [
          {
            value: 'hello',
            label: 'Hello',
          },
        ],
      },
    },
  },
  {
    name: 'set prop on target with failing condition',
    input: [
      {
        $setProp: {
          $target: 'banaan',
          $prop: 'subtext',
          $value: 'hi',
          $if: [
            {
              $target: 'aardbei',
              $in: ['hi', 'hello'],
            },
          ],
        },
      },
    ],
    result: {
      aardbei: {},
      banaan: {
        subtext: 'world',
      },
      appel: {},
    },
  },
] satisfies TestInput[];

describe('executeSetPropOperation', () => {
  afterEach(() => {
    useFormBuilder().forms.value = {};
  });

  it.each(datasets)('should set value with $name', async ({input, result}) => {
    expect.assertions(1);

    const form = defineForm('test', {
      fields: [
        {
          name: 'aardbei',
          component: 'input',
          ref: ref(''),
          afterUpdate: buildAfterUpdate(input, ''),
        },
        {
          name: 'banaan',
          component: 'input',
          ref: ref(''),
          props: {
            subtext: 'world',
          },
        },
        {
          name: 'appel',
          component: 'input',
          ref: ref(''),
        },
      ],
    });

    const wrapper = mount(MagicForm, {props: {form}});

    form.setValue('aardbei', 'test');

    const testField = form.getField('aardbei');
    // todo remove this when afterUpdate is properly triggered
    testField?.afterUpdate(testField);

    await wrapper.vm.$nextTick();

    expect({
      aardbei: form.getField('aardbei')?.props,
      banaan: form.getField('banaan')?.props,
      appel: form.getField('appel')?.props,
    }).toEqual(result);
  });
});
