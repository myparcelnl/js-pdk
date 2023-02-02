/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect, it} from 'vitest';
import {PartialComponentTest} from '../types';
import {mount} from '@vue/test-utils';

export const runCommonComponentTests: PartialComponentTest = (component, options): void => {
  it('can be rendered', () => {
    expect(() => mount(component, options)).not.toThrow();
  });

  it('is visible', () => {
    const wrapper = mount(component, options);
    expect(wrapper.isVisible()).toBeTruthy();
  });
};
