import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';
import {AdminComponentTest} from '../tests';
import {MountingOptions} from '@vue/test-utils';

export const runModalTest: AdminComponentTest = (component) => {
  const options: MountingOptions<any> = {
    props: {
      // todo
      actions: [],
      title: 'title',
    },
  };

  runCommonComponentTests(component, options);

  runHasSlotTest(component, options);

  runHasPropTest(component, options, 'modalKey');
  runHasPropTest(component, options, 'title');
  runHasPropTest(component, options, 'actions');
};
