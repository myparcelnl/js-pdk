import {runCommonComponentTests, runHasSlotTest} from '../common';
import {PdkComponentTest} from '../tests';

export const runPlainWrapperTest: PdkComponentTest = (component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component);

  // TODO write more tests
};
