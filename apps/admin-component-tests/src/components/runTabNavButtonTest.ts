import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runTabNavButtonTest = ((component) => {
  const suite = new TestSuite(AdminComponent.SelectInput, component);

  suite.setOptions({
    props: {
      tab: {name: 'tab', label: 'Tab'},
    },
  });

  suite.runCommonComponentTests();

  suite.runHasPropTest('active', false);
}) satisfies AdminComponentTest;
