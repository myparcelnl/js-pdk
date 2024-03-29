import {TriState} from '@myparcel-pdk/common';
import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runTriStateInputTest = ((component) => {
  const options = createInputOptions(TriState.On);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);

  // TODO: write more tests
}) satisfies AdminComponentTest;
