import {ref} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import MagicForm, {defineForm, useFormBuilder} from '@myparcel-dev/vue-form-builder';
import {buildAfterUpdate} from '../builders';

describe('executeOperations', () => {
  afterEach(() => {
    useFormBuilder().forms.value = {};
  });

  it('executes custom operations', async () => {
    expect.assertions(3);
    const method = vi.fn();

    const form = defineForm('test', {});

    await form.addElement({
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
    });

    const wrapper = mount(MagicForm, {props: {form}});

    expect(method).not.toHaveBeenCalled();

    const testField = form.getField('test');
    // Trigger afterUpdate via hooks manager (new vue-form-builder API)
    await testField?.hooks.execute('afterUpdate', testField, 'test', '');

    await wrapper.vm.$nextTick();

    expect(method).toHaveBeenCalledTimes(1);
    expect(method).toHaveBeenCalledWith({$value: 'hello'});
  });
});
