import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runTableRowTest: AdminComponentTest = (component) => {
  const options: ComponentMountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);
};
