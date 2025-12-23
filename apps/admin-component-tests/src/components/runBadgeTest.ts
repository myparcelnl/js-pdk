import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runBadgeTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Badge, component);

  suite.runCommonComponentTests();
}) satisfies AdminComponentTest;
