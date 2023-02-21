import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core/src';
import {runCommonComponentTests, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runFormGroupTest: AdminComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runHasSlotTest(component, options);
  // TODO write more tests
};
