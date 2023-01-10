import {runCommonInputTests, runHasPropTest} from '../common';
import {ComponentTest} from '../types';

export const runToggleInputTest: ComponentTest = (component) => {
  runCommonInputTests(component);

  runHasPropTest(component, 'labelYes');
  runHasPropTest(component, 'labelNo');
};
