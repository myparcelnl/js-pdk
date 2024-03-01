import {type Shipment} from '@myparcel-pdk/common';
import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runDropOffInputTest = ((component) => {
  const options = createInputOptions([
    {
      date: {date: '', timezone: '', timezone_type: 3},
      cutoffTime: '',
      dispatch: true,
      sameDayCutoffTime: '',
      weekday: 2,
    },
  ] satisfies Shipment.ModelDropOffDay[]);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options);
  // TODO write more tests
}) satisfies AdminComponentTest;
