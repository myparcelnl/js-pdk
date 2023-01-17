import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core';
import {MountingOptions, mount} from '@vue/test-utils';
import {expect, it} from 'vitest';
import {PdkComponentTest} from '../tests';
import {SelectOption} from '@myparcel-pdk/common';
import {runCommonComponentTests} from '../common';

const selectOptions: SelectOption[] = [
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
];

export const runSelectInputTest: PdkComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance; options: SelectOption[]}> = {
    props: {
      element: createFormElement({}),
      options: selectOptions,
    },
  };

  runCommonComponentTests(component, options);

  it('can be disabled', () => {
    const wrapper = mount(component, {props: {disabled: true}});
    expect(wrapper.find('select').attributes('disabled')).toBeDefined();
  });

  it('sets options from props', () => {
    const wrapper = mount(component, {props: {options}});

    expect(
      wrapper
        .find('select')
        .findAll('option')
        .map((wrapper) => wrapper.element.value),
    ).toEqual(['1', '2']);
  });

  it('sets selected value from modelValue prop', () => {
    const wrapper = mount(component, {props: {modelValue: '2'}});
    expect(wrapper.find('select').element.value).toBe('2');
  });

  it('emits update:modelValue event', async () => {
    expect.assertions(1);
    const wrapper = mount(component, {props: {options}});

    const select = wrapper.find('select');
    await select.setValue('2');

    expect(Object.keys(wrapper.emitted())).toEqual(['update:modelValue']);
  });
};
