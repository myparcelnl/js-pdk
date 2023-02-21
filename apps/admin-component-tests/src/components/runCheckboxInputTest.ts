import {runCommonComponentTests, runCommonInputTests} from '../common';
import {AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';

export const runCheckboxInputTest: AdminComponentTest = (component) => {
  const options = createInputOptions(true);

  runCommonComponentTests(component, options);
  runCommonInputTests(component);
  // TODO write more tests
};
