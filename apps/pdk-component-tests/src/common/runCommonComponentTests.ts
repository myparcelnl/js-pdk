/* eslint-disable @typescript-eslint/no-explicit-any */
import {expect, it} from 'vitest';
import {Component} from 'vue';
import {MountingOptions} from '@vue/test-utils';
import {mount} from '@myparcel-pdk/frontend-core';

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
