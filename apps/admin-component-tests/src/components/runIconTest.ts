import {expect, it} from 'vitest';
import {type ComponentMountingOptions, mount} from '@vue/test-utils';
import {type PartialComponentTest} from '../types';
import {runCommonComponentTests, runHasPropTest} from '../common';

export const runIconTest = ((component) => {
  const options = {
    props: {
      icon: 'truck',
    },
  } satisfies ComponentMountingOptions<any>;

  runCommonComponentTests(component, options);

  runHasPropTest(component, options, 'icon');

  it.skip('has icon prop', () => {
    const wrapper = mount(component, options);

    expect(wrapper.props().icon).toBe('truck');
  });
}) satisfies PartialComponentTest;
