import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests} from '../common';

export const runSettingsDividerTest = ((component) => {
  const options = createInputOptions('text', {
    props: {
      level: 2,
      heading: 'test',
    },
  });

  runCommonComponentTests(component, options);
}) satisfies AdminComponentTest;
