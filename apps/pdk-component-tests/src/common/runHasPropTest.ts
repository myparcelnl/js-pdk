import {expect, it} from 'vitest';
import {ComponentTest} from '../executePdkComponentTest';
import {mount} from '@myparcel-pdk/frontend-core';

export const runHasPropTest: ComponentTest = (component, prop, value = 'value') => {
  it(`has prop ${prop}`, () => {
    const wrapper = mount(component, {props: {[prop as string]: value}});
    expect(wrapper.props(prop as string)).toBe('value');
  });
};
