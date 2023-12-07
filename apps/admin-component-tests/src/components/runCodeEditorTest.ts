import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runCodeEditorTest = ((component) => {
  runCommonComponentTests(component);
}) satisfies AdminComponentTest;
