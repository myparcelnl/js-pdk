import {runCommonComponentTests, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';

export const runPlainWrapperTest: AdminComponentTest = (component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component);

  // TODO write more tests
};
