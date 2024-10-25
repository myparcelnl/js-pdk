import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runColTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Col, component);

  suite.runCommonComponentTests();

  suite.runHasSlotTest();
  suite.runHasPropTest('span', 3);
}) satisfies AdminComponentTest;
