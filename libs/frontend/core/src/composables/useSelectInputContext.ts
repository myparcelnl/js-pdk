import {ComputedRef, WritableComputedRef, computed, onMounted, watch} from 'vue';
import {SelectOption} from '@myparcel-pdk/common/src';
import {useLanguage} from './translations';

type UseSelectInputContext = (
  model: WritableComputedRef<string | number>,
  options: SelectOption[],
) => {
  options: ComputedRef<SelectOption[]>;
};

export const useSelectInputContext: UseSelectInputContext = (model, options) => {
  const {translate} = useLanguage();

  const computedOptions = computed<SelectOption[]>(() => {
    return options
      .map((item) => ({...item, label: translate(item.label)}))
      .sort((itemA, itemB) => String(itemA.label).localeCompare(itemB.label));
  });

  onMounted(() => {
    watch(
      computedOptions,
      (newOptions) => {
        const hasExistingValue = model.value && newOptions.some((option) => option.value === model.value);

        if (hasExistingValue || newOptions.length === 0) {
          return;
        }

        model.value = newOptions[0].value;
      },
      {immediate: Number(computedOptions.value?.length) > 0},
    );
  });

  return {
    options: computedOptions,
  };
};
