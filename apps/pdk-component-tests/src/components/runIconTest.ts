import {expect, it} from 'vitest';
import {runCommonComponentTests, runHasPropTest} from '../common';
import {ComponentTest} from '../types';
import {mount} from '@vue/test-utils';

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
