/* eslint-disable @typescript-eslint/no-magic-numbers */
import {ref} from 'vue';
import {expect, it} from 'vitest';
import {merge} from 'lodash-unified';
import {flushPromises, mount} from '@vue/test-utils';
import {type PartialComponentTest} from '../types';
import {runHasPropTest} from './runHasPropTest';

const UPDATE_EVENT = 'update:modelValue';

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
            isDisabled: ref(true),
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

  it(`emits ${UPDATE_EVENT} event`, async () => {
    expect.assertions(2);
    const wrapper = mount(component, options);

    const select = wrapper.find('select');
    const input = wrapper.find('input');

    const valueToSet = additionalOptions?.value ?? 'test';

    if (select.exists()) {
      await select.setValue(valueToSet);
    }

    if (input.exists()) {
      await input.setValue(valueToSet);
    }

    await flushPromises();

    const emitted = wrapper.emitted();

    expect(emitted).toHaveProperty(UPDATE_EVENT);
    expect(emitted[UPDATE_EVENT]).toHaveLength(1);
    /** @todo fix this */
    // expect(emitted[UPDATE_EVENT][0]).toEqual([valueToSet]);
  });
}) satisfies PartialComponentTest<[AdditionalOptions]>;
