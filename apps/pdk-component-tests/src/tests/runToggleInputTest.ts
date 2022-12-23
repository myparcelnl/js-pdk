import {ComponentTest, runCommonComponentTests, runCommonInputTests, runHasPropTest} from '../common';

export const runToggleInputTest: ComponentTest = (component) => {
  runCommonComponentTests(component);
  runCommonInputTests(component);

  runHasPropTest(component, 'labelYes');
  runHasPropTest(component, 'labelNo');
};
