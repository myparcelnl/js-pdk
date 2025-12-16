import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runRadioInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.RadioInput, component);

  suite.createInputOptions(true);

  suite.runCommonComponentTests();
  suite.runCommonInputTests();
  // TODO write more tests
}) satisfies AdminComponentTest;
