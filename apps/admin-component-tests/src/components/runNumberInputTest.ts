import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runNumberInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.NumberInput, component);

  suite.createInputOptions(24);

  suite.runCommonComponentTests();
  suite.runCommonInputTests();
  // TODO write more tests
}) satisfies AdminComponentTest;
