import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runRadioInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.RadioInput, component);

  suite.createInputOptions(true);

  suite.runCommonComponentTests();
  suite.runCommonInputTests();
  // TODO write more tests
}) satisfies AdminComponentTest;
