import {runCommonComponentTests, runCommonInputTests} from '../common';
import {AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';

export const runTextInputTest: AdminComponentTest = (component) => {
  const options = createInputOptions('text');

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
};
