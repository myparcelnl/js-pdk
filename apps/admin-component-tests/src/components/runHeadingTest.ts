import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runHeadingTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Heading, component);

  suite.runCommonComponentTests();

  suite.runHasSlotTest();
  suite.runHasPropTest('level', 1);
}) satisfies AdminComponentTest;
