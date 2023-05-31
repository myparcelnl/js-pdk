import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runCodeEditorTest: AdminComponentTest = (component) => {
  runCommonComponentTests(component);
};
