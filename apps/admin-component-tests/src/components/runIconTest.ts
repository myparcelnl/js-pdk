import {expect, it} from 'vitest';
import {type ComponentMountingOptions, mount} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest} from '../common';

export const runIconTest: AdminComponentTest = (component) => {
  const options: ComponentMountingOptions<any> = {
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
