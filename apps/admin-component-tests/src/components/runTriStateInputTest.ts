import {TriState} from '@myparcel-dev/pdk-common';
import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runTriStateInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.SelectInput, component);

  suite.createInputOptions(TriState.On);

  suite.runCommonComponentTests();
  suite.runCommonInputTests();

  // TODO: write more tests
}) satisfies AdminComponentTest;
