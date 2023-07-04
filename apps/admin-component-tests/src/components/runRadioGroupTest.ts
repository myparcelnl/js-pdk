import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runRadioGroupTest: AdminComponentTest = (component) => {
  const options: ComponentMountingOptions<any> = {};
  runCommonComponentTests(component, options);
  // TODO write more tests
};
