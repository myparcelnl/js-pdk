import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runTextAreaTest = ((component) => {
  const suite = new TestSuite(AdminComponent.SelectInput, component);

  suite.createInputOptions('test');

  suite.runCommonComponentTests();
  // runCommonInputTests(component, options);
}) satisfies AdminComponentTest;
