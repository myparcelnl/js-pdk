import {ComponentTest, runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runModalTest: ComponentTest = (component) => {
  runCommonComponentTests(component);
  runHasSlotTest(component);
  runHasPropTest(component, 'modalKey');
  runHasPropTest(component, 'title');
  runHasPropTest(component, 'actions');
};
