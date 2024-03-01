import {type DropOffInputModelValue} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {createInputOptions} from '../helpers';
import {runCommonComponentTests, runCommonInputTests} from '../common';

export const runDropOffInputTest = ((component) => {
  const options = createInputOptions({
    dropOffDays: [
      {
        date: {date: '', timezone: '', timezone_type: 3},
        cutoffTime: '12:00',
        dispatch: true,
        sameDayCutoffTime: '',
        weekday: 2,
      },
    ],
    dropOffDaysDeviations: [],
  } satisfies DropOffInputModelValue);

  runCommonComponentTests(component, options);
  runCommonInputTests(component, options, {
    value: {
      date: {date: '1234', timezone: '', timezone_type: 3},
      cutoffTime: '15:00',
      dispatch: true,
      sameDayCutoffTime: '',
      weekday: 4,
    },
  });
  // TODO write more tests
}) satisfies AdminComponentTest;
