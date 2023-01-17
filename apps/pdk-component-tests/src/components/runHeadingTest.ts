import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';

export const runHeadingTest: PdkComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component);

  runHasPropTest(component, options, 'level', 1);
};
