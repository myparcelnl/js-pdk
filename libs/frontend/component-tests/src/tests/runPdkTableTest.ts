import {ComponentTest, runCommonComponentTests, runHasSlotTest} from '../common';

export const runPdkTableTest: ComponentTest = (component) => {
  runCommonComponentTests(component);
  runHasSlotTest(component, 'default');
  runHasSlotTest(component, 'header');
  runHasSlotTest(component, 'footer');
};
