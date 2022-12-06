import {expect, it} from 'vitest';
import {ComponentTest} from './executePdkComponentTest';
import {mount} from './mount';

export const runHasPropTest: ComponentTest = (component, prop) => {
  it(`has prop ${prop}`, () => {
    const wrapper = mount(component, {props: {icon: 'value'}});
    expect(wrapper.props('icon')).toBe('value');
  });
};
