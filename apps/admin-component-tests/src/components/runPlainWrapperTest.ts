import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runPlainWrapperTest = ((component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component);

  // TODO write more tests
}) satisfies AdminComponentTest;
