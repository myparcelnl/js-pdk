import {AdminComponent, type SelectOption} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runRadioGroupTest = ((component) => {
  const suite = new TestSuite(AdminComponent.RadioGroup, component);

  suite.createInputOptions('test1', {
    props: {
      options: [
        {
          label: 'Test1',
          value: 'test1',
        },
        {
          label: 'Test2',
          value: 'test2',
        },
      ] satisfies SelectOption[],
    },
  });

  suite.runCommonComponentTests();
  suite.runCommonInputTests();
  // TODO write more tests
}) satisfies AdminComponentTest;
