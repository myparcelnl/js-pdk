import {runCommonComponentTests, runCommonInputTests} from '../common';
import {AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';

export const runNumberInputTest: AdminComponentTest = (component) => {
  const options = createInputOptions(24);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
};
