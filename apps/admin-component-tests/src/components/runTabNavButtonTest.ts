import {runCommonComponentTests, runHasPropTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runTabNavButtonTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {
    props: {
      tab: {name: 'tab', label: 'Tab'},
    },
  };

  runCommonComponentTests(component, options);

  runHasPropTest(component, options, 'active', false);
  runHasPropTest(component, options, 'tab', {name: 'tab2', label: 'Tab 2'});
};
