import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runMultiCheckboxTest: PdkComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  // TODO: write more tests
};
