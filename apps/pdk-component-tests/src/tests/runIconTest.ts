import {ComponentTest, runCommonComponentTests, runHasPropTest} from '../common';
import {expect, it} from 'vitest';
import {mount} from '@myparcel-pdk/frontend-core';

export const runIconTest: ComponentTest = (component) => {
  const defaultProps = {
    props: {
      icon: 'truck',
    },
  };

  runCommonComponentTests(component, defaultProps);

  runHasPropTest(component, 'icon');

  it.skip('has icon prop', () => {
    const wrapper = mount(component, defaultProps);

    expect(wrapper.props().icon).toBe('truck');
  });
};
