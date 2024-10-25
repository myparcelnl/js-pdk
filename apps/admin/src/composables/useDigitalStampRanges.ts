import {computed, type ComputedRef} from 'vue';
import {get, type MaybeRef} from '@vueuse/core';
import {type Plugin} from '@myparcel-pdk/common';
import {type SelectOptionWithPlainLabel} from '../types/form.types';
import {useOrderData} from './orders/useOrderData';

interface UseDigitalStampRanges {
  ranges: ComputedRef<SelectOptionWithPlainLabel<number, string>[]>;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  currentRange: ComputedRef<SelectOptionWithPlainLabel<number, string>>;
}

export const useDigitalStampRanges = (weight: MaybeRef<number>): UseDigitalStampRanges => {
  // todo: move this to global context
  const {order} = useOrderData();

  const allRanges = computed<Plugin.DigitalStampRange[]>(() => get(order).digitalStampRanges ?? []);

  const ranges = computed<SelectOptionWithPlainLabel<number, string>[]>(() => {
    return allRanges.value.map((range) => ({
      plainLabel: `${range.min}g – ${range.max}g`,
      value: range.average,
    }));
  });

  const currentRange = computed(() => {
    const resolvedWeight = get(weight);

    const matchingRange = allRanges.value.find((range) => range.min <= resolvedWeight && range.max >= resolvedWeight);

    return ranges.value.find((range) => range.value === matchingRange?.average) ?? ranges.value[0];
  });

  return {
    ranges,
    currentRange,
  };
};
