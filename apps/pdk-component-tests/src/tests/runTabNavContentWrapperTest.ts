import {runCommonComponentTests, runHasSlotTest} from '../common';
import {ComponentTest} from '../executePdkComponentTest';

export const runTabNavContentWrapperTest: ComponentTest = (component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component);
};
