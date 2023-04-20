import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runHeadingTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component);

  runHasPropTest(component, options, 'level', 1);
};
