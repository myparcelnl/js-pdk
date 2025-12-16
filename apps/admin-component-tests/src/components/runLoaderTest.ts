import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runLoaderTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Loader, component);

  suite.runCommonComponentTests();
}) satisfies AdminComponentTest;
