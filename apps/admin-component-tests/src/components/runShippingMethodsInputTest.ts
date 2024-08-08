import {AdminComponent, type SelectOption} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

const SELECT_OPTIONS = Object.freeze([
  {value: '1', label: 'One'},
  {value: '2', label: 'Two'},
  {value: '3', label: 'Three'},
  {value: '4', label: 'Four'},
  {value: '5', label: 'Five'},
] satisfies SelectOption[]);

export const runShippingMethodsInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.ShippingMethodsInput, component);

  suite.createInputOptions('2', {props: {options: SELECT_OPTIONS}});

  suite.runCommonComponentTests();
  // TODO: figure out why this throws an undefined import error on AdminComponent
  // runCommonInputTests(component, options, {value: '1'});

  // TODO add more tests
}) satisfies AdminComponentTest;
