import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runCurrencyInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.CurrencyInput, component);

  suite.createInputOptions(1.42);

  suite.runCommonComponentTests();
  suite.runCommonInputTests({value: 1.5});
  // TODO write more tests
}) satisfies AdminComponentTest;
