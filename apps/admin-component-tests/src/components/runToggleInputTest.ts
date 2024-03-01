import {type ComponentMountingOptions} from '@vue/test-utils';
import {createFormElement, type ElementInstance} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runToggleInputTest = ((component) => {
  const options: ComponentMountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
}) satisfies AdminComponentTest;
