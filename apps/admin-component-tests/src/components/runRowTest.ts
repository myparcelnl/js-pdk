import {type MountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runRowTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);

  runHasPropTest(component, options, 'collapseGutters', true);
  runHasPropTest(component, options, 'columns', 3);
};
