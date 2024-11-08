import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runColTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Col, component);

  suite.runCommonComponentTests();

  suite.runHasSlotTest();
}) satisfies AdminComponentTest;
