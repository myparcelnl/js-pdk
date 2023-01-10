import {ComponentTest} from '../types';
import {runHasSlotTest} from '../common';

export const runTableTest: ComponentTest = (component) => {
  runHasSlotTest(component, 'default');
  runHasSlotTest(component, 'header');
  runHasSlotTest(component, 'footer');
};
