import {expect, it} from 'vitest';
import {ComponentTest} from '../types';
import {mount} from '@vue/test-utils';

export const runTextInputTest: ComponentTest = (component) => {
  it('can be disabled', () => {
    const wrapper = mount(component, {props: {disabled: true}});
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('sets input value from modelValue prop', () => {
    const wrapper = mount(component, {props: {modelValue: 'text'}});
    expect(wrapper.find('input').element.value).toBe('text');
  });

  it('emits update:modelValue event', async () => {
    expect.assertions(1);
    const wrapper = mount(component);

    const input = wrapper.find('input');
    await input.setValue('new text');

    expect(Object.keys(wrapper.emitted())).toEqual(['update:modelValue', 'input', 'change']);
  });
};
