import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-core';
import {runCommonComponentTests, runCommonInputTests, runHasPropTest} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';

export const runToggleInputTest: PdkComponentTest = (component) => {
  const options: MountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);

  runHasPropTest(component, options, 'labelYes');
  runHasPropTest(component, options, 'labelNo');
};
