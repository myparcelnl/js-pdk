import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runBadgeTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Badge, component);

  suite.runCommonComponentTests();
}) satisfies AdminComponentTest;
