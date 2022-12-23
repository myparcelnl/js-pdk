import {ComponentTest, runCommonComponentTests, runHasSlotTest} from '../common';

export const runTableTest: ComponentTest = (component) => {
  runCommonComponentTests(component);
  runHasSlotTest(component, 'default');
  runHasSlotTest(component, 'header');
  runHasSlotTest(component, 'footer');
};
