import {reactive, watch} from 'vue';
import {type Settings, type Shipment} from '@myparcel-dev/pdk-common';
import {useWeekdays, type Weekday, type Weekdays} from '../useWeekdays';
import {createFormElement, createObjectWithKeys} from '../../utils';
import {type DropOffInputProps} from '../../types';

type UseDropOffInputContext = (
  props: DropOffInputProps,
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
// @ts-expect-error todo
export const useDropOffInputContext: UseDropOffInputContext = (props, emit) => {
  const {weekdaysObject, weekdays} = useWeekdays();

  const createReactiveObject = <K extends keyof Required<Shipment.ModelDropOffDay>>(
    property: K,
    defaultValue: Required<Shipment.ModelDropOffDay>[K],
  ) => {
    return reactive(
      createObjectWithKeys(weekdays, (day) => {
        return props.modelValue?.dropOffDays.find(({weekday}) => weekday === day)?.[property] ?? defaultValue;
      }),
    );
  };

  const toggleRefs = createReactiveObject('dispatch', false);
  const cutoffRefs = createReactiveObject('cutoffTime', '16:00');

  const {component: _, ...restElement} = props.element;

  const createElements = (reactiveObject: Record<Weekday, unknown>, name: string) =>
    createObjectWithKeys(weekdays, (day) =>
      createFormElement({
        ...restElement,
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
