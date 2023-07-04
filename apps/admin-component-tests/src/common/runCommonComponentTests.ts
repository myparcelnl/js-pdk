/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {type PartialComponentTest} from '../types';

export const runCommonComponentTests: PartialComponentTest = (component, options): void => {
  it('can be rendered', () => {
    expect(() => mount(component as any, options as any)).not.toThrow();
  });

  it('is visible', () => {
    const wrapper = mount(component as any, options as any);
    expect(wrapper.isVisible()).toBeTruthy();
  });
};
