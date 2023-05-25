/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {PartialComponentTest} from '../types';

export const runCommonComponentTests: PartialComponentTest = (component, options): void => {
  it('can be rendered', () => {
    expect(() => mount(component, options)).not.toThrow();
  });

  it('is visible', () => {
    const wrapper = mount(component, options);
    expect(wrapper.isVisible()).toBeTruthy();
  });
};
