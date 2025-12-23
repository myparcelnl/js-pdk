import {AdminComponent, type SelectOption} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runCheckboxGroupTest = ((component) => {
  const suite = new TestSuite(AdminComponent.CheckboxGroup, component);

  suite.createInputOptions(['appel', 'boom'], {
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

  suite.runCommonComponentTests();
  // TODO: write more tests
}) satisfies AdminComponentTest;
