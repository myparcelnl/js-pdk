import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core/src';
import {runCommonComponentTests, runCommonInputTests} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {AdminComponentTest} from '../tests';

export const runCheckboxInputTest: AdminComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runCommonInputTests(component);
  // TODO write more tests
};
