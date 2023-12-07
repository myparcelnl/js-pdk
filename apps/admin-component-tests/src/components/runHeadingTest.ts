import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runHeadingTest = ((component) => {
  const options = {} satisfies ComponentMountingOptions<any>;

  runCommonComponentTests(component, options);

  runHasSlotTest(component);

  runHasPropTest(component, options, 'level', 1);
}) satisfies AdminComponentTest;
