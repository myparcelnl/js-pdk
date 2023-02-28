import {ComputedRef, Ref, computed, onMounted, watch} from 'vue';
import {SelectOption} from '@myparcel-pdk/common/src';
import {useLanguage} from './translations';

type UseSelectInputContext = (
  model: Ref<unknown>,
  options: SelectOption[],
) => {
  options: ComputedRef<SelectOption[]>;
};

export const useSelectInputContext: UseSelectInputContext = (model, options) => {
  const {translate} = useLanguage();

  const computedOptions = computed<SelectOption[]>(() => {
    return options
      .map((item) => ({...item, label: translate(item.label)}))
      .sort((itemA, itemB) => {
        // Keep "none" option at the top
        if (itemB.value === -1) {
          return 1;
        }

        return String(itemA.label).localeCompare(String(itemB.label));
      });
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
