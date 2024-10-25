import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runTableTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Table, component);

  suite.runCommonComponentTests();

  suite.runHasSlotTest();
  suite.runHasSlotTest('header');
  suite.runHasSlotTest('footer');
}) satisfies AdminComponentTest;
