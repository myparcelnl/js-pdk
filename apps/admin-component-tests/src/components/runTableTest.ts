import {runCommonComponentTests, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runTableTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options, 'default');
  runHasSlotTest(component, options, 'header');
  runHasSlotTest(component, options, 'footer');
};
