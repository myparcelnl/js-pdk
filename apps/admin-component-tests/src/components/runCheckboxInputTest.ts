import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runCheckboxInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.CheckboxInput, component);

  suite.createInputOptions(true);

  suite.runCommonComponentTests();
  suite.runCommonInputTests({value: false});
  // TODO write more tests
}) satisfies AdminComponentTest;
