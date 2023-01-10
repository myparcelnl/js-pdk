import {runHasPropTest, runHasSlotTest} from '../common';
import {ComponentTest} from '../types';

export const runRowTest: ComponentTest = (component) => {
  runHasSlotTest(component);
  runHasPropTest(component, 'collapseGutters', true);
  runHasPropTest(component, 'columns', 3);
};
