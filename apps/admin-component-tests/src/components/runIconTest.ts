import {type ComponentMountingOptions} from '@vue/test-utils';
import {AdminIcon} from '@myparcel-pdk/admin';
import {type PartialComponentTest} from '../types';
import {runCommonComponentTests, runHasPropTest} from '../common';

export const runIconTest = ((component) => {
  const options = {
    props: {
      icon: AdminIcon.ArrowUp,
    },
  } satisfies ComponentMountingOptions<any>;

  runCommonComponentTests(component, options);
  runHasPropTest(component, options, 'icon');
}) satisfies PartialComponentTest;
