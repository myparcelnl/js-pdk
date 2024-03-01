import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests} from '../common';

export const runCodeEditorTest = ((component) => {
  const options = createInputOptions('test');

  runCommonComponentTests(component, options);
}) satisfies AdminComponentTest;
