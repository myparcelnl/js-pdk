import {AdminComponent, createFormElement} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runToggleInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.SelectInput, component);

  suite.setOptions({
    props: {
      element: createFormElement({}),
    },
  });

  suite.runCommonComponentTests();
  suite.runCommonInputTests();
}) satisfies AdminComponentTest;
