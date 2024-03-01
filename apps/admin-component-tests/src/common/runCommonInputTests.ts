import {expect, it} from 'vitest';
import {merge} from 'lodash-unified';
import {flushPromises, mount} from '@vue/test-utils';
import {type PartialComponentTest} from '../types';
import {runHasPropTest} from './runHasPropTest';

interface AdditionalOptions {
  value?: unknown;
}

// eslint-disable-next-line max-lines-per-function
export const runCommonInputTests = ((component, options = undefined, additionalOptions: AdditionalOptions = {}) => {
  runHasPropTest(component, {}, 'element', options?.props?.element);

  it('can be disabled', () => {
    const wrapper = mount(
      component,
      merge({}, options, {
        props: {
          element: {
            ...options?.props?.element,
            isDisabled: true,
          },
        },
      }),
    );

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
    const wrapper = mount(component, options);

    const select = wrapper.find('select');
    const input = wrapper.find('input');

    if (select.exists()) {
      expect(select.element.value).toEqual(options?.props?.modelValue);
    }

    if (input.exists()) {
      expect(input.element.value).toEqual(options?.props?.modelValue);
    }
  });

  it('emits update:modelValue event', async () => {
    expect.assertions(1);
    const wrapper = mount(component, options);

    const select = wrapper.find('select');
    const input = wrapper.find('input');

    if (select.exists()) {
      await select.setValue(additionalOptions?.value ?? '2');
    }

    if (input.exists()) {
      await input.setValue(additionalOptions?.value ?? 'new text');
    }

    await flushPromises();

    expect(Object.keys(wrapper.emitted())).toContain('update:modelValue');
  });
}) satisfies PartialComponentTest<[AdditionalOptions]>;
