import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core';
import {runCommonComponentTests, runCommonInputTests} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';

export const runCheckboxInputTest: PdkComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runCommonInputTests(component);
  // TODO write more tests
};
