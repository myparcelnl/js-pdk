import {runCommonComponentTests, runHasSlotTest} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';

export const runTabNavContentWrapperTest: PdkComponentTest = (component) => {
  const options: MountingOptions<any> = {};

  runCommonComponentTests(component, options);

  runHasSlotTest(component);
};
