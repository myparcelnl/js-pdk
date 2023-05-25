import {AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runCurrencyInputTest: AdminComponentTest = (component) => {
  const options = createInputOptions(1.42);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
};
