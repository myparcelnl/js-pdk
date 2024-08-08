import {AdminComponent, type DropOffInputModelValue} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests';
import {TestSuite} from '../TestSuite';

export const runDropOffInputTest = ((component) => {
  const suite = new TestSuite(AdminComponent.DropOffInput, component);

  suite.setOptions({
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

  suite.runCommonComponentTests();
  suite.runCommonInputTests({
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
