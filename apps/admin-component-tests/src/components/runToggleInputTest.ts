import {type ComponentMountingOptions} from '@vue/test-utils';
import {createFormElement, type ElementInstance} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runCommonInputTests, runHasPropTest} from '../common';

export const runToggleInputTest: AdminComponentTest = (component) => {
  const options: ComponentMountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);

  runHasPropTest(component, options, 'labelYes');
  runHasPropTest(component, options, 'labelNo');
};
