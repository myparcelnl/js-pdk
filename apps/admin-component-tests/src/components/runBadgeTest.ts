import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runBadgeTest = ((component) => {
  runCommonComponentTests(component);
}) satisfies AdminComponentTest;
