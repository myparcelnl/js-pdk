import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core/src';
import {MountingOptions} from '@vue/test-utils';
import {AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runMultiCheckboxTest: AdminComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  // TODO: write more tests
};
