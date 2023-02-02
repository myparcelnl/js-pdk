import {runCommonComponentTests, runHasPropTest} from '../common';
import {MountingOptions} from '@vue/test-utils';
import {PdkComponentTest} from '../tests';

export const runImageTest: PdkComponentTest = (component) => {
  const options: MountingOptions<any> = {
    props: {
      src: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      alt: 'Google Logo',
    },
  };

  runCommonComponentTests(component, options);
  runHasPropTest(component, options, 'src');
  runHasPropTest(component, options, 'alt');
  runHasPropTest(component, options, 'width');
  runHasPropTest(component, options, 'height');

  // TODO write more tests
};
