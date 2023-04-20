import {ElementInstance, createFormElement} from '@myparcel-pdk/frontend-admin-core/src';
import {runCommonComponentTests, runCommonInputTests, runHasPropTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runToggleInputTest: AdminComponentTest = (component) => {
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
