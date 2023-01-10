import {runHasPropTest, runHasSlotTest} from '../common';
import {ComponentTest} from '../types';

export const runHeadingTest: ComponentTest = (component) => {
  runHasPropTest(component, 'level', 1);
  runHasSlotTest(component);
};
