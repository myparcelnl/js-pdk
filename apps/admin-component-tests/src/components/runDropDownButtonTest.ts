/* eslint-disable no-console */
import {expect, it, vi} from 'vitest';
import {type ComponentMountingOptions, mount} from '@vue/test-utils';
import {AdminComponent, type DropdownButtonProps} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runDropDownButtonTest = ((component) => {
  const suite = new TestSuite(AdminComponent.DropdownButton, component);

  const action1Handler = vi.fn();
  const action2Handler = vi.fn();
  const action3Handler = vi.fn();

  const DEFAULT_OPTIONS = {
    props: {
      actions: [
        {
          label: 'Action 1',
          id: 'action1',
          standalone: true,
          handler: action1Handler,
        },
        {
          label: 'Action 2',
          id: 'action2',
          handler: action2Handler,
        },
        {
          label: 'Action 3',
          id: 'action3',
          handler: action3Handler,
        },
      ],
    },
  } satisfies ComponentMountingOptions<any, DropdownButtonProps>;

  suite.runCommonComponentTests();
  suite.runCommonComponentTests(DEFAULT_OPTIONS);

  suite.runHasPropTest('actions', DEFAULT_OPTIONS.props.actions);
  suite.runHasPropTest('disabled', true);

  it('emits click event when standalone action is clicked', async () => {
    expect.assertions(1);
    const wrapper = mount(component, DEFAULT_OPTIONS);
    const button = wrapper.findByTestId([AdminComponent.DropdownButton, 'standalone']);
    await button.trigger('click');

    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it('emits click event when dropdown action is clicked', async () => {
    expect.assertions(1);
    const wrapper = mount(component, DEFAULT_OPTIONS);
    const button = wrapper.findByTestId([AdminComponent.DropdownButton, 'item']);
    await button.trigger('click');

    expect(wrapper.emitted().click).toHaveLength(1);
  });

  it('can be disabled', async () => {
    expect.assertions(2);
    const wrapper = mount(component, {
      ...DEFAULT_OPTIONS,
      props: {
        ...DEFAULT_OPTIONS.props,
        disabled: true,
      },
    });

    const button = wrapper.findByTestId([AdminComponent.DropdownButton, 'button']);
    expect(button.attributes('disabled')).toBeDefined();

    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().click).toBeUndefined();
  });

  // TODO write more tests
}) satisfies AdminComponentTest;
