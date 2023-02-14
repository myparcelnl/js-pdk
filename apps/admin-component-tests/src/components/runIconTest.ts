import {MountingOptions, mount} from '@vue/test-utils';
import {expect, it} from 'vitest';
import {runCommonComponentTests, runHasPropTest} from '../common';
import {AdminComponentTest} from '../tests';

export const runIconTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {
    props: {
      icon: 'truck',
    },
  };

  runCommonComponentTests(component, options);

  runHasPropTest(component, options, 'icon');

  it.skip('has icon prop', () => {
    const wrapper = mount(component, options);

    expect(wrapper.props().icon).toBe('truck');
  });
};
