import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';

export const runRowTest: PdkComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);

  runHasPropTest(component, options, 'collapseGutters', true);
  runHasPropTest(component, options, 'columns', 3);
};
