import {type MountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runTableRowTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);
};
