import {ComponentTest, runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runRowTest: ComponentTest = (component) => {
  runCommonComponentTests(component);
  runHasSlotTest(component);
  runHasPropTest('collapseGutters', true);
  runHasPropTest('columns', 3);
};
