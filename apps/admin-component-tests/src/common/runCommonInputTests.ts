import {expect, it} from 'vitest';
import {merge} from 'lodash-unified';
import {mount} from '@vue/test-utils';
import {type PartialComponentTest} from '../types';
import {runHasPropTest} from './runHasPropTest';

// eslint-disable-next-line max-lines-per-function
export const runCommonInputTests: PartialComponentTest = (component, options) => {
  runHasPropTest(component, {}, 'element', options?.props?.element);

  it('can be disabled', () => {
    // @ts-expect-error component types
    const wrapper = mount(component, merge({}, options, {props: {element: {isDisabled: true}}}));

    const select = wrapper.find('select');
    const input = wrapper.find('input');

    if (select.exists()) {
      expect(select.attributes('disabled')).toBeDefined();
    }

    if (input.exists()) {
      expect(input.attributes('disabled')).toBeDefined();
    }
  });

  it('sets value from modelValue prop', () => {
    // @ts-expect-error component types
    const wrapper = mount(component, options);

    const select = wrapper.find('select');
    const input = wrapper.find('input');

    if (select.exists()) {
      expect(select.element.value).toBe(options?.props?.modelValue);
    }

    if (input.exists()) {
      expect(input.element.value).toBe(options?.props?.modelValue);
    }
  });

  it('emits update:modelValue event', async () => {
    expect.assertions(1);
    // @ts-expect-error component types
    const wrapper = mount(component, options);

    const select = wrapper.find('select');
    const input = wrapper.find('input');

    if (select.exists()) {
      await select.setValue('2');
    }

    if (input.exists()) {
      await input.setValue('new text');
    }

    expect(Object.keys(wrapper.emitted())).toContain(['update:modelValue']);
  });
};
