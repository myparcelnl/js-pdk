import {ComponentTest} from '../types';
import {runHasPropTest} from '../common';

export const runImageTest: ComponentTest = (component) => {
  runHasPropTest(component, 'src');
  runHasPropTest(component, 'alt');
  runHasPropTest(component, 'width');
  runHasPropTest(component, 'height');

  // TODO write more tests
};
