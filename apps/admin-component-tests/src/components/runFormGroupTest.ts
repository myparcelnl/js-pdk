import {AdminComponent, createFormElement} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runFormGroupTest = ((component) => {
  const suite = new TestSuite(AdminComponent.FormGroup, component);

  suite.setOptions({
    props: {
      element: createFormElement({}),
    },
  });

  suite.runCommonComponentTests();
  suite.runHasSlotTest();
  // TODO write more tests
}) satisfies AdminComponentTest;
