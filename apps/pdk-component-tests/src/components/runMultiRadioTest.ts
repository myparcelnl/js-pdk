import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runMultiRadioTest: PdkComponentTest = (component) => {
  const options: MountingOptions<any> = {};
  runCommonComponentTests(component, options);
  // TODO write more tests
};
