import {reactive, watch} from 'vue';
import {Settings, Shipment} from '@myparcel-pdk/common';
import {createFormElement, createObjectWithKeys} from '../utils';
import {Weekday, Weekdays, useWeekdays} from './useWeekdays';

type UseDropOffInputContext = (
  possibilities: Settings.ModelDropOffPossibilities,
  emit?: (name: 'update:modelValue', ...args: unknown[]) => void,
) => {
  weekdaysObject: Record<Weekday, string>;
  weekdays: Weekdays;
  toggleRefs: Record<Weekday, boolean>;
  cutoffRefs: Record<Weekday, string>;
  cutoffElements: Record<Weekday, ReturnType<typeof createFormElement>>;
  toggleElements: Record<Weekday, ReturnType<typeof createFormElement>>;
};

// eslint-disable-next-line max-lines-per-function
export const useDropOffInputContext: UseDropOffInputContext = (possibilities, emit) => {
  const {weekdaysObject, weekdays} = useWeekdays();

  const createReactiveObject = <K extends keyof Required<Shipment.ModelDropOffDay>>(
    property: K,
    defaultValue: Required<Shipment.ModelDropOffDay>[K],
  ) => {
    return reactive(
      createObjectWithKeys(weekdays, (day) => {
        return possibilities.dropOffDays.find(({weekday}) => weekday === day)?.[property] ?? defaultValue;
      }),
    );
  };

  const toggleRefs = createReactiveObject('dispatch', false);
  const cutoffRefs = createReactiveObject('cutoffTime', '00:00');

  const createElements = (reactiveObject: Record<Weekday, unknown>, name: string) =>
    createObjectWithKeys(weekdays, (day) =>
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

    emit?.('update:modelValue', value);
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
