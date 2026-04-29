import {ref} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {defineForm, MagicForm, useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {buildAfterUpdate} from '../builders';

describe('executeOperations', () => {
  afterEach(() => {
    useFormBuilder().forms.value = {};
  });

  it('executes custom operations', async () => {
    expect.assertions(3);
    const method = vi.fn();

    const form = defineForm('test', {
      fields: [
        {
          name: 'test',
          component: 'input',
          ref: ref(''),
          afterUpdate: buildAfterUpdate(
            [
              {
                $custom: {$value: 'hello'},
              },
              {
                $custom: {
                  $value: 'hello',
                  $if: [
                    {
                      $eq: '123',
                    },
                  ],
                },
              },
            ],
            '',
            [
              {
                name: '$custom',
                callback: (operation) => {
                  method(operation);
                },
              },
            ],
          ),
        },
      ],
    });

    mount(MagicForm, {props: {form}});

    expect(method).not.toHaveBeenCalled();

    form.setValue('test', 'test');

    // afterUpdate fires async, so wait for it to settle.
    await flushPromises();

    expect(method).toHaveBeenCalledTimes(1);
    expect(method).toHaveBeenCalledWith({$value: 'hello'});
  });
});
