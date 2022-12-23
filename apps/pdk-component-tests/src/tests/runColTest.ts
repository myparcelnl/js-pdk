import {ComponentTest, runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runColTest: ComponentTest = (component) => {
  runCommonComponentTests(component);
  runHasSlotTest(component);
  runHasPropTest('span', 3);
};
