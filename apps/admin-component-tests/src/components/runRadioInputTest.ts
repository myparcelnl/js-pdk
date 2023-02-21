import {runCommonComponentTests, runCommonInputTests} from '../common';
import {AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';

export const runRadioInputTest: AdminComponentTest = (component) => {
  const options = createInputOptions(true);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
};
