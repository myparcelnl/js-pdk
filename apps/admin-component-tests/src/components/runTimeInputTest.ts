import {type ComponentMountingOptions} from '@vue/test-utils';
import {createFormElement, type ElementInstance} from '@myparcel-pdk/frontend-admin-core';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runTimeInputTest: AdminComponentTest = (component) => {
  const options: ComponentMountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
};
