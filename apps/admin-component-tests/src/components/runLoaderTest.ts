import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runLoaderTest: AdminComponentTest = (component) => {
  runCommonComponentTests(component);
};
