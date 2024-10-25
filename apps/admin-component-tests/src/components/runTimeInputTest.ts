import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runTimeInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.TimeInput, component);

  suite.createInputOptions('12:00');

  suite.runCommonComponentTests();
  suite.runCommonInputTests({value: '13:00'});
  // TODO write more tests
}) satisfies AdminComponentTest;
