import {type MountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runHeadingTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component);

  runHasPropTest(component, options, 'level', 1);
};
