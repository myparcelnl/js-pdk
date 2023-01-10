import {runCommonComponentTests, runHasSlotTest} from '../common';
import {ComponentTest} from '../executePdkComponentTest';

export const runTabNavButtonWrapperTest: ComponentTest = (component) => {
  runCommonComponentTests(component);

  runHasSlotTest(component);
};
