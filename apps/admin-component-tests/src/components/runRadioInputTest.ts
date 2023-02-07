import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core/src';
import {runCommonComponentTests, runCommonInputTests} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';

export const runRadioInputTest: PdkComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
};
