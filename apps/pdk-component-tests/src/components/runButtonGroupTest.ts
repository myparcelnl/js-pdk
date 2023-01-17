import {runCommonComponentTests, runHasSlotTest} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';

export const runButtonGroupTest: PdkComponentTest = (component) => {
  const options: MountingOptions<any> = {
    props: {
      // todo
      actions: [],
    },
  };

  runCommonComponentTests(component, options);
  runHasSlotTest(component, options);
};
