import {type SelectOption} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests} from '../common';

const SELECT_OPTIONS = Object.freeze([
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
  {value: '3', label: 'Three'},
  {value: '4', label: 'Four'},
  {value: '5', label: 'Five'},
] satisfies SelectOption[]);

export const runShippingMethodsInputTest = ((component) => {
  const options = createInputOptions('2', {props: {options: SELECT_OPTIONS}});

  runCommonComponentTests(component, options);
  // TODO: figure out why this throws an undefined import error on AdminComponent
  // runCommonInputTests(component, options, {value: '1'});

  // TODO add more tests
}) satisfies AdminComponentTest;
