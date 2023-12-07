import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runMultiSelectInputTest = ((component) => {
  runCommonComponentTests(component);
}) satisfies AdminComponentTest;
