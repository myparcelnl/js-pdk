import {createObjectWithKeys} from '../utils';
import {Format, useLocalizedFormatter} from './formatter';

// eslint-disable-next-line no-magic-numbers,@typescript-eslint/no-magic-numbers
const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] as const;

export type Weekdays = typeof WEEKDAYS;

export type Weekday = Weekdays[number];

type UseWeekdays = {
  weekdays: Weekdays;
  weekdaysObject: Record<Weekday, string>;
};

export const useWeekdays = (): UseWeekdays => {
  const formatter = useLocalizedFormatter();
  const weekdaysObject = createObjectWithKeys(WEEKDAYS, (day) => formatter.format(Format.Weekday, day));

  return {
    weekdays: WEEKDAYS,
    weekdaysObject,
  };
};
