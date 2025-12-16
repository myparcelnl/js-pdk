import {AdminComponent, AdminIcon} from '@myparcel-dev/pdk-admin';
import {type PartialComponentTest} from '../types';
import {TestSuite} from '../TestSuite';

export const runIconTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Icon, component);

  suite.setOptions({
    props: {
      icon: AdminIcon.ArrowUp,
    },
  });

  suite.runCommonComponentTests();
  suite.runHasPropTest('icon');
}) satisfies PartialComponentTest;
