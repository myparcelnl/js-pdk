import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests} from '../common';

export const runTextAreaTest = ((component) => {
  const options = createInputOptions('test');

  runCommonComponentTests(component, options);
  // runCommonInputTests(component, options);
}) satisfies AdminComponentTest;
