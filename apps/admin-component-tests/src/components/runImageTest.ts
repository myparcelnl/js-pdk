import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runImageTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Image, component);

  suite.setOptions({
    props: {
      src: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      alt: 'Google Logo',
    },
  });

  suite.runCommonComponentTests();
  suite.runHasPropTest('src');
  suite.runHasPropTest('alt');
  suite.runHasPropTest('width');
  suite.runHasPropTest('height');

  // TODO write more tests
}) satisfies AdminComponentTest;
