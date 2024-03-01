import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {type PartialComponentTest} from '../types';

export const runHasPropTest = ((component, options, prop, value = 'value') => {
  it(`has prop ${prop}`, () => {
    const wrapper = mount(component, {
      ...options,
      props: {
        ...(options?.props as any),
        [prop]: value,
      },
    });

    expect(wrapper.props()).toHaveProperty(prop);
  });
}) satisfies PartialComponentTest<[string] | [string, unknown]>;
