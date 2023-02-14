import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core/src';
import {MountingOptions, mount} from '@vue/test-utils';
import {expect, it} from 'vitest';
import {AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runTextInputTest: AdminComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);

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
