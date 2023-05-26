import {type MountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runTableTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options, 'default');
  runHasSlotTest(component, options, 'header');
  runHasSlotTest(component, options, 'footer');
};
