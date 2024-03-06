import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runBoxTest = ((component) => {
  const options = {} satisfies ComponentMountingOptions<any>;

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options, 'default');
  runHasSlotTest(component, options, 'header');
  runHasSlotTest(component, options, 'footer');

  runHasPropTest(component, options, 'loading', true);
}) satisfies AdminComponentTest;
