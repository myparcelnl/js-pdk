import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests} from '../common';

export const runSettingsDividerTest = ((component) => {
  const options = createInputOptions('text');

  runCommonComponentTests(component, options);
}) satisfies AdminComponentTest;
