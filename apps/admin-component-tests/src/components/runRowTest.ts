import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runRowTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);

  runHasPropTest(component, options, 'collapseGutters', true);
  runHasPropTest(component, options, 'columns', 3);
};
