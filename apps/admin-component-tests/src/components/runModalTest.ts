import {type ComponentMountingOptions} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests, runHasPropTest, runHasSlotTest} from '../common';

export const runModalTest = ((component) => {
  const options: ComponentMountingOptions<any> = {
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
}) satisfies AdminComponentTest;
