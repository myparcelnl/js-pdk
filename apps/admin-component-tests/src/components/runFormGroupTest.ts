import {type ComponentMountingOptions} from '@vue/test-utils';
import {createFormElement, type ElementInstance} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasSlotTest} from '../common';

export const runFormGroupTest = ((component) => {
  const options: ComponentMountingOptions<{element: ElementInstance}> = {
    props: {
      element: createFormElement({}),
    },
  };

  runCommonComponentTests(component, options);
  runHasSlotTest(component, options);
  // TODO write more tests
}) satisfies AdminComponentTest;
