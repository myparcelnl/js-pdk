import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runMultiDateInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.MultiDateInput, component);

  suite.runCommonComponentTests();
  // TODO write more tests
}) satisfies AdminComponentTest;
