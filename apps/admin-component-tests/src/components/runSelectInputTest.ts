import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {AdminComponent, type SelectOption} from '@myparcel-dev/pdk-admin';
import {type PartialComponentTest} from '../types';
import {TestSuite} from '../TestSuite';

const selectOptions = [
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
] satisfies SelectOption[];

export const runSelectInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.SelectInput, component);

  const options = suite.createInputOptions('2', {props: {options: selectOptions}});

  suite.runCommonComponentTests();
  suite.runCommonInputTests({value: '1'});

  it('sets options from props', () => {
    const wrapper = mount(component, options);

    expect(
      wrapper
        .find('select')
        .findAll('option')
        .map((wrapper) => wrapper.element.value),
    ).toEqual(['1', '2']);
  });
}) satisfies PartialComponentTest;
