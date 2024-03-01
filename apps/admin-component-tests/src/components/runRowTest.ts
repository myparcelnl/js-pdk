import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runRowTest = ((component) => {
  const options: ComponentMountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);
}) satisfies AdminComponentTest;
