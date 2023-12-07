import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runColTest = ((component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component, {});
  runHasPropTest(component, {}, 'span', 3);
}) satisfies AdminComponentTest;
