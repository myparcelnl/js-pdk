/* eslint-disable @typescript-eslint/no-explicit-any */
import {MountingOptions, mount} from '@vue/test-utils';
import {expect, it} from 'vitest';
import {Component} from 'vue';

export const runCommonComponentTests = <C extends Omit<Component, 'props'>>(
  component: C,
  options: MountingOptions<any> = {},
): void => {
  it('can be rendered', () => {
    expect(() => mount(component, options)).not.toThrow();
  });

  it('is visible', () => {
    const wrapper = mount(component, options);
    expect(wrapper.isVisible()).toBeTruthy();
  });
};
