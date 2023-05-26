import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests} from '../common';

export const runCheckboxGroupTest: AdminComponentTest = (component) => {
  const options = createInputOptions(['appel', 'boom']);

  runCommonComponentTests(component, options);
  // TODO: write more tests
};
