import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {type SelectOption} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

const selectOptions: SelectOption[] = [
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
];

export const runSelectInputTest: AdminComponentTest = (component) => {
  const options = createInputOptions('2', {options: selectOptions});

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);

  it('sets options from props', () => {
    const wrapper = mount(component, {props: {options}});

    expect(
      wrapper
        .find('select')
        .findAll('option')
        .map((wrapper) => wrapper.element.value),
    ).toEqual(['1', '2']);
  });
};
