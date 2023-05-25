import {AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runPlainWrapperTest: AdminComponentTest = (component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component);

  // TODO write more tests
};
