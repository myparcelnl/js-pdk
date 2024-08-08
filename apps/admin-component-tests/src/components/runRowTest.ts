import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runRowTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Row, component);

  suite.runCommonComponentTests();

  suite.runHasSlotTest();
}) satisfies AdminComponentTest;
