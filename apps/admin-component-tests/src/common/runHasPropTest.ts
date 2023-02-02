import {expect, it} from 'vitest';
import {PartialComponentTest} from '../types';
import {mount} from '@vue/test-utils';

export const runHasPropTest: PartialComponentTest = (component, options, prop, value = 'value') => {
  it(`has prop ${prop}`, () => {
    const wrapper = mount(component, {
      ...options,
      props: {
        ...options.props,
        [prop as string]: value,
      },
    });

    expect(wrapper.props(prop as string)).toBe('value');
  });
};
