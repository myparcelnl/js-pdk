import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runTimeInputTest = ((component) => {
  const options = createInputOptions('12:00');

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options, {value: '13:00'});
  // TODO write more tests
}) satisfies AdminComponentTest;
