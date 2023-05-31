import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {type PartialComponentTest} from '../types';

export const runHasPropTest: PartialComponentTest = (component, options, prop, value = 'value') => {
  it(`has prop ${prop}`, () => {
    const wrapper = mount(component as any, {
      ...options,
      props: {
        ...options?.props,
        [prop as string]: value,
      },
    });

    expect(wrapper.props(prop as string)).toBe('value');
  });
};
