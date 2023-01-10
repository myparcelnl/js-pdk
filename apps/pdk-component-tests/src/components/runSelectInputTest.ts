import {expect, it} from 'vitest';
import {ComponentTest} from '../types';
import {SelectOption} from '@myparcel-pdk/common';
import {mount} from '@vue/test-utils';

const options: SelectOption[] = [
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
];

export const runSelectInputTest: ComponentTest = (component) => {
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
