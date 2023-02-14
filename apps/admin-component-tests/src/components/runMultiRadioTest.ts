import {MountingOptions} from '@vue/test-utils';
import {AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runMultiRadioTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};
  runCommonComponentTests(component, options);
  // TODO write more tests
};
