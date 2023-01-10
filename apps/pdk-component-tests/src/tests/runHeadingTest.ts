import {runCommonComponentTests, runHasPropTest} from '../common';
import {ComponentTest} from '../executePdkComponentTest';

export const runHeadingTest: ComponentTest = (component) => {
  runCommonComponentTests(component);

  runHasPropTest(component, 'level', 1);
};
