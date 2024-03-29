import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runLinkTest = ((component) => {
  const options: ComponentMountingOptions<any> = {};

  runCommonComponentTests(component, options);
  runHasSlotTest(component, options);

  // TODO write more tests
}) satisfies AdminComponentTest;
