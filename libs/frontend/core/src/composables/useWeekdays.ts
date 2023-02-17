import {useLocalizedFormatter} from './formatter';

// eslint-disable-next-line no-magic-numbers,@typescript-eslint/no-magic-numbers
const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] as const;

type Weekdays = {
  weekdays: typeof WEEKDAYS;
  weekdaysObject: Record<keyof typeof WEEKDAYS, string>;
  createObjectFromWeekdays: <T>(callback: (day: keyof typeof WEEKDAYS) => T) => Record<keyof typeof WEEKDAYS, T>;
};

export const useWeekdays = (): Weekdays => {
  const formatter = useLocalizedFormatter();

  // @ts-expect-error type {} is not the record we expect
  const createObjectFromWeekdays: Weekdays['createObjectFromWeekdays'] = (callback) => {
    return WEEKDAYS.reduce((acc, day) => ({...acc, [day]: callback(day)}), {});
  };

  const weekdaysObject = createObjectFromWeekdays((day) => formatter.format('weekday', day));

  return {
    createObjectFromWeekdays,
    weekdays: WEEKDAYS,
    weekdaysObject,
  };
};
