import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runTableRowTest = ((component) => {
  const suite = new TestSuite(AdminComponent.TableRow, component);

  suite.runCommonComponentTests();

  suite.runHasSlotTest();
}) satisfies AdminComponentTest;
