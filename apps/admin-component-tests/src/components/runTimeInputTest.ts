import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';
import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runTimeInputTest: AdminComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
};
