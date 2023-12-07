import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runNumberInputTest = ((component) => {
  const options = createInputOptions(24);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
}) satisfies AdminComponentTest;
