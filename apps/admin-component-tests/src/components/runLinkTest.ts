import {runCommonComponentTests, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runLinkTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);
  runHasSlotTest(component, options);

  // TODO write more tests
};
