import {Settings, Shipment} from '@myparcel-pdk/common/src';
import {reactive, watch} from 'vue';
import {DEFAULT_VALUE_EMIT} from '../data';
import {createFormElement} from '../utils';
import {useWeekdays} from './useWeekdays';

type Weekdays = ReturnType<typeof useWeekdays>['weekdays'];

type UseDropOffInputContext = (
  possibilities: Settings.ModelDropOffPossibilities,
  emit?: (name: typeof DEFAULT_VALUE_EMIT, ...args: unknown[]) => void,
) => {
  weekdaysObject: Record<keyof Weekdays, string>;
  weekdays: Weekdays;
  toggleRefs: Record<keyof Weekdays, boolean>;
  cutoffRefs: Record<keyof Weekdays, string>;
  cutoffElements: Record<keyof Weekdays, ReturnType<typeof createFormElement>>;
  toggleElements: Record<keyof Weekdays, ReturnType<typeof createFormElement>>;
};

// eslint-disable-next-line max-lines-per-function
export const useDropOffInputContext: UseDropOffInputContext = (possibilities, emit) => {
  const {weekdaysObject, weekdays, createObjectFromWeekdays} = useWeekdays();

  const createReactiveObject = <K extends keyof Required<Shipment.ModelDropOffDay>>(
    property: K,
    defaultValue: Required<Shipment.ModelDropOffDay>[K],
  ) => {
    return reactive(
      createObjectFromWeekdays((day) => {
        return possibilities.dropOffDays.find(({weekday}) => weekday === day)?.[property] ?? defaultValue;
      }),
    );
  };

  const toggleRefs = createReactiveObject('dispatch', false);
  const cutoffRefs = createReactiveObject('cutoffTime', '00:00');

  const createElements = (reactiveObject: Record<keyof Weekdays, unknown>, name: string) =>
    createObjectFromWeekdays((day) =>
      createFormElement({
        // @ts-expect-error Not worth the effort
        ref: reactiveObject[day],
        name: `${name}${day.toString()}`,
      }),
    );

  const toggleElements = createElements(toggleRefs, 'toggle');
  const cutoffElements = createElements(cutoffRefs, 'cutoff');

  watch([toggleRefs, cutoffRefs], () => {
    const value: Settings.ModelDropOffPossibilities = {
      dropOffDays: weekdays.map((day) => ({
        weekday: day,
        dispatch: toggleRefs[day],
        cutoffTime: cutoffRefs[day],
      })),
      dropOffDaysDeviations: [],
    };

    emit?.(DEFAULT_VALUE_EMIT, value);
  });

  return {
    cutoffElements,
    toggleElements,
    cutoffRefs,
    toggleRefs,
    weekdays,
    weekdaysObject,
  };
};
