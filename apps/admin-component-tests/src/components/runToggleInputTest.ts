import {AdminComponent, createFormElement} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runToggleInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.ToggleInput, component);

  suite.setOptions({
    props: {
      element: createFormElement({}),
    },
  });

  suite.runCommonComponentTests();
  suite.runCommonInputTests();
}) satisfies AdminComponentTest;
