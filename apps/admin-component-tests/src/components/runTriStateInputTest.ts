import {TriState} from '@myparcel-pdk/common';
import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runTriStateInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.SelectInput, component);

  suite.createInputOptions(TriState.On);

  suite.runCommonComponentTests();
  suite.runCommonInputTests();

  // TODO: write more tests
}) satisfies AdminComponentTest;
