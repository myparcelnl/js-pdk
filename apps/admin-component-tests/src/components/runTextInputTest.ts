import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runTextInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.SelectInput, component);

  suite.createInputOptions('text');

  suite.runCommonComponentTests();
  suite.runCommonInputTests();
}) satisfies AdminComponentTest;
