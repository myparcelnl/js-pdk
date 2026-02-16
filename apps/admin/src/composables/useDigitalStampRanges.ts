import {computed, type ComputedRef, toValue} from 'vue';
import {type MaybeRef} from '@vueuse/core';
import {type Plugin} from '@myparcel-dev/pdk-common';
import {type SelectOptionWithPlainLabel} from '../types';
import {useOrderData} from './orders';

interface UseDigitalStampRanges {
  ranges: ComputedRef<SelectOptionWithPlainLabel<number, string>[]>;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
  currentRange: ComputedRef<SelectOptionWithPlainLabel<number, string>>;
}

export const useDigitalStampRanges = (
  weight: MaybeRef<number>,
  order?: MaybeRef<null | {digitalStampRanges?: Plugin.DigitalStampRange[]}>,
): UseDigitalStampRanges => {
  const fallbackOrder = order ? null : useOrderData().order;

  const allRanges = computed<Plugin.DigitalStampRange[]>(() => {
    return toValue(order ?? fallbackOrder)?.digitalStampRanges ?? [];
  });

  const ranges = computed<SelectOptionWithPlainLabel<number, string>[]>(() => {
    return allRanges.value.map((range) => ({
      plainLabel: `${range.min}g – ${range.max}g`,
      value: range.average,
    }));
  });

  const currentRange = computed(() => {
    const resolvedWeight = toValue(weight);

    const matchingRange = allRanges.value.find((range) => range.min <= resolvedWeight && range.max >= resolvedWeight);

    return ranges.value.find((range) => range.value === matchingRange?.average) ?? ranges.value[0];
  });

  return {
    ranges,
    currentRange,
  };
};
