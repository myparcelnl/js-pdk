import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runLinkTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Link, component);

  suite.runCommonComponentTests();
  suite.runHasSlotTest();

  // TODO write more tests
}) satisfies AdminComponentTest;
