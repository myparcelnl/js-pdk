import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runTextAreaTest = ((component) => {
  runCommonComponentTests(component);
}) satisfies AdminComponentTest;
