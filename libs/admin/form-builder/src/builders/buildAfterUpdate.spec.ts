import {ref} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {defineForm, MagicForm, useFormBuilder} from '@myparcel/vue-form-builder';
import {buildAfterUpdate} from './buildAfterUpdate';

describe('buildAfterUpdate', () => {
  afterEach(() => {
    useFormBuilder().forms.value = {};
  });

  it('builds', () => {
    const result = buildAfterUpdate([{$setValue: {$value: 'hello'}}], '');

    expect(result).toBeDefined();
  });

  it('should execute afterUpdate hook', async () => {
    expect.assertions(3);

    const afterUpdate = vi.fn(buildAfterUpdate([{$setValue: {$value: 'hello'}}], ''));

    const form = defineForm('test', {
      fields: [
        {
          name: 'test',
          component: 'input',
          ref: ref(''),
          afterUpdate,
        },
      ],
    });

    const wrapper = mount(MagicForm, {props: {form}});

    expect(afterUpdate).not.toHaveBeenCalled();

    form.setValue('test', 'test');

    const testField = form.getField('test');
    // todo remove this when afterUpdate is properly triggered
    testField?.afterUpdate(testField);

    await wrapper.vm.$nextTick();

    expect(afterUpdate).toHaveBeenCalledTimes(1);
    expect(form.getValue('test')).toBe('hello');
  });
});
