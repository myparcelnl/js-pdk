import {type SelectOption} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests} from '../common';

export const runCheckboxGroupTest = ((component) => {
  const options = createInputOptions(['appel', 'boom'], {
    props: {
      options: [
        {
          value: 'appel',
          label: 'Appel',
        },
        {
          value: 'boom',
          label: 'Boom',
        },
        {
          value: 'citroen',
          label: 'Citroen',
        },
      ] satisfies SelectOption[],
    },
  });

  runCommonComponentTests(component, options);
  // TODO: write more tests
}) satisfies AdminComponentTest;
