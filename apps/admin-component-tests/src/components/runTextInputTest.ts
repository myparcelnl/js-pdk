import {AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runTextInputTest: AdminComponentTest = (component) => {
  const options = createInputOptions('text');

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
};
