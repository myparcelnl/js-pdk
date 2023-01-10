import {runHasPropTest, runHasSlotTest} from '../common';
import {ComponentTest} from '../types';

export const runColTest: ComponentTest = (component) => {
  runHasSlotTest(component);
  runHasPropTest(component, 'span', 3);
};
