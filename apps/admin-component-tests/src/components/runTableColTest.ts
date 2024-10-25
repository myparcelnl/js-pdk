import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runTableColTest = ((component) => {
  const suite = new TestSuite(AdminComponent.TableCol, component);

  suite.runCommonComponentTests();

  suite.runHasSlotTest();
}) satisfies AdminComponentTest;
