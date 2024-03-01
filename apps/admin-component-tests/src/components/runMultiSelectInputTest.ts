import {type SelectOption} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

const selectOptions = [
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'},
] satisfies SelectOption[];

export const runMultiSelectInputTest = ((component) => {
  const options = createInputOptions('two', {props: {options: selectOptions}});

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options, {value: 'one'});
}) satisfies AdminComponentTest;
