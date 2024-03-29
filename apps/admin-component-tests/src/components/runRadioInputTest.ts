import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runRadioInputTest = ((component) => {
  const options = createInputOptions(true);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
}) satisfies AdminComponentTest;
