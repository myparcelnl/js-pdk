import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';

export const runColTest: AdminComponentTest = (component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component, {});
  runHasPropTest(component, {}, 'span', 3);
};
