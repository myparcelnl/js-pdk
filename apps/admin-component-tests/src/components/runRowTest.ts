import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runRowTest = ((component) => {
  const options: ComponentMountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);

  runHasPropTest(component, options, 'collapseGutters', true);
  runHasPropTest(component, options, 'columns', 3);
}) satisfies AdminComponentTest;
