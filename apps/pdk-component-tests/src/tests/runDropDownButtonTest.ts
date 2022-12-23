import {ComponentTest, runCommonComponentTests, runHasPropTest} from '../common';
import {expect, it} from 'vitest';
import {mount} from '@myparcel-pdk/frontend-core';

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

export const runDropDownButtonTest: ComponentTest = (component) => {
  runCommonComponentTests(component, DEFAULT_OPTIONS);

  runHasPropTest(component, 'actions', DEFAULT_OPTIONS.props.actions);
  runHasPropTest(component, 'disabled', true);

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
};
