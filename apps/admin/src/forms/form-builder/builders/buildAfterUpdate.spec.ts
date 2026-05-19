import {ref} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {defineForm, MagicForm, useFormBuilder} from '@myparcel-dev/vue-form-builder';
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

    mount(MagicForm, {props: {form}});

    expect(afterUpdate).not.toHaveBeenCalled();

    form.setValue('test', 'test');

    // afterUpdate fires async, so wait for it to settle.
    await flushPromises();

    expect(afterUpdate).toHaveBeenCalled();
    expect(form.getValue('test')).toBe('hello');
  });
});
