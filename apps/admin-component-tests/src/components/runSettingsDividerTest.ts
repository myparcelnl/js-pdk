import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runSettingsDividerTest = ((component) => {
  const suite = new TestSuite(AdminComponent.SettingsDivider, component);

  suite.createInputOptions('text', {
    props: {
      level: 2,
      heading: 'test',
    },
  });

  suite.runCommonComponentTests();
}) satisfies AdminComponentTest;
