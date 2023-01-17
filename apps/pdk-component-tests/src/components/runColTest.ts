import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';
import {PdkComponentTest} from '../tests';

export const runColTest: PdkComponentTest = (component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component, {});
  runHasPropTest(component, {}, 'span', 3);
};
