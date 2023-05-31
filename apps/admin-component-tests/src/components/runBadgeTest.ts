import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runBadgeTest: AdminComponentTest = (component) => {
  runCommonComponentTests(component);
};
