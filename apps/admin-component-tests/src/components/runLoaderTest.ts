import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runLoaderTest = ((component) => {
  runCommonComponentTests(component);
}) satisfies AdminComponentTest;
