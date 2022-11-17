import {expect, it} from 'vitest';
import {Component} from 'vue';
import {MountingOptions} from '@vue/test-utils';
import {mount} from './mount';

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
