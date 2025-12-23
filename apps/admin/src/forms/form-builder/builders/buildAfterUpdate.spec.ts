import {ref} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import MagicForm, {defineForm, useFormBuilder} from '@myparcel-dev/vue-form-builder';
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

    const form = defineForm('test', {});

    await form.addElement({
      name: 'test',
      component: 'input',
      ref: ref(''),
      afterUpdate,
    });

    const wrapper = mount(MagicForm, {props: {form}});

    expect(afterUpdate).not.toHaveBeenCalled();

    form.setValue('test', 'test');

    const testField = form.getField('test');
    // afterUpdate must be triggered manually via hooks.execute in new vue-form-builder API
    await testField?.hooks.execute('afterUpdate', testField, 'test', '');

    await wrapper.vm.$nextTick();

    // The spy is called once when we execute the hook
    expect(afterUpdate).toHaveBeenCalled();
    expect(form.getValue('test')).toBe('hello');
  });
});
