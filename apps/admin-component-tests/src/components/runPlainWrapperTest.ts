import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runPlainWrapperTest = ((component) => {
  const suite = new TestSuite('PlainWrapper', component);

  suite.runCommonComponentTests();

  suite.runHasSlotTest();

  // TODO write more tests
}) satisfies AdminComponentTest;
