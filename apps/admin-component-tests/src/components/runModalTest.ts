import {type MountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

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
