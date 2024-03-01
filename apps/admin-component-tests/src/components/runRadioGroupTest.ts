import {type SelectOption} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runRadioGroupTest = ((component) => {
  const options = createInputOptions('test1', {
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

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
}) satisfies AdminComponentTest;
