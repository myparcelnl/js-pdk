import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runSettingsDividerTest = ((component) => {
  runCommonComponentTests(component);
}) satisfies AdminComponentTest;
