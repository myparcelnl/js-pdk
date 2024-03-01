import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runCurrencyInputTest = ((component) => {
  const options = createInputOptions(1.42);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options, {
    value: 1.5,
  });
  // TODO write more tests
}) satisfies AdminComponentTest;
