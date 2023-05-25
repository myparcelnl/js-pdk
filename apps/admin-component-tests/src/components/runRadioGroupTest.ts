import {MountingOptions} from '@vue/test-utils';
import {AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runRadioGroupTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {};
  runCommonComponentTests(component, options);
  // TODO write more tests
};
