import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest} from '../common';

export const runTabNavButtonTest = ((component) => {
  const options: ComponentMountingOptions<any> = {
    props: {
      tab: {name: 'tab', label: 'Tab'},
    },
  };

  runCommonComponentTests(component, options);

  runHasPropTest(component, options, 'active', false);
}) satisfies AdminComponentTest;
