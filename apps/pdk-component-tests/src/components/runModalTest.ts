import {runHasPropTest, runHasSlotTest} from '../common';
import {ComponentTest} from '../types';

export const runModalTest: ComponentTest = (component) => {
  runHasSlotTest(component);
  runHasPropTest(component, 'modalKey');
  runHasPropTest(component, 'title');
  runHasPropTest(component, 'actions');
};
