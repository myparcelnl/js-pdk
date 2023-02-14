/* eslint-disable no-console */
import {MountingOptions, mount} from '@vue/test-utils';
import {expect, it} from 'vitest';
import {runCommonComponentTests, runHasPropTest} from '../common';
import {AdminComponentTest} from '../tests';

const DEFAULT_OPTIONS = {
  props: {
    actions: [
      {
        label: 'Action 1',
        onClick: () => {
          console.log('Action 1 clicked');
        },
      },
      {
        label: 'Action 2',
        onClick: () => {
          console.log('Action 2 clicked');
        },
      },
    ],
  },
};

export const runDropDownButtonTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);
  runCommonComponentTests(component, DEFAULT_OPTIONS);

  runHasPropTest(component, options, 'actions', DEFAULT_OPTIONS.props.actions);
  runHasPropTest(component, options, 'disabled', true);

  it('emits click event when action is clicked', async () => {
    expect.assertions(1);
    const wrapper = mount(component, DEFAULT_OPTIONS);
    const button = wrapper.find('button');

    button.element.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it('can be disabled', async () => {
    expect.assertions(2);
    const wrapper = mount(component, {props: {disabled: true}});
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();

    button.element.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().click).toBeUndefined();
  });

  it('emits click event when dropdown action is clicked', async () => {
    expect.assertions(1);
    const wrapper = mount(component, DEFAULT_OPTIONS);
    const dropdown = wrapper.find('button');

    dropdown.element.click();
    await wrapper.vm.$nextTick();
    const action = wrapper.find('.dropdown-item');

    action.element.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().click).toHaveLength(2);
  });

  // TODO write more tests
};
