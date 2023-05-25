import {MountingOptions} from '@vue/test-utils';
import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

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
