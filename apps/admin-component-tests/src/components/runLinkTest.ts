import {type MountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runLinkTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);
  runHasSlotTest(component, options);

  // TODO write more tests
};
