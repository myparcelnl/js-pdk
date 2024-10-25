import {AdminComponent, type SelectOption} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

const selectOptions = [
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'},
] satisfies SelectOption[];

export const runMultiSelectInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.MultiSelectInput, component);

  suite.createInputOptions('two', {props: {options: selectOptions}});

  suite.runCommonComponentTests();
  suite.runCommonInputTests({value: 'one'});
}) satisfies AdminComponentTest;
