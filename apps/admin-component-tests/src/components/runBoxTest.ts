import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runBoxTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Box, component);

  suite.createInputOptions();

  suite.runCommonComponentTests();

  suite.runHasSlotTest('default');
  suite.runHasSlotTest('header');
  suite.runHasSlotTest('footer');

  suite.runHasPropTest('loading', true);
}) satisfies AdminComponentTest;
