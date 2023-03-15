import {ComputedRef, Ref, WritableComputedRef, computed, onMounted, watch} from 'vue';
import {ElementInstance, OptionsProp} from '../types';
import {SelectOption} from '@myparcel-pdk/common/src';
import {generateFieldId} from '../utils';
import {useLanguage} from './translations';
import {useVModel} from '@vueuse/core';

type SelectInputProps<T = string | number> = {
  modelValue: T;
  element: ElementInstance<OptionsProp>;
};

type UseSelectInputContext<
  T = string | number,
  P extends SelectInputProps<T> = SelectInputProps<T>,
  K extends keyof P = keyof P,
> = (
  props: SelectInputProps,
  emit: (e: 'update:modelValue', value: T) => void,
) => {
  id: string;
  model: Ref<P[K]> | WritableComputedRef<P[K]>;
  options: ComputedRef<SelectOption[]>;
};

export const useSelectInputContext: UseSelectInputContext = (props, emit) => {
  const {translate} = useLanguage();

  const id = generateFieldId(props.element);
  const model = useVModel(props, undefined, emit);

  const options = computed(() => {
    return (props.element.props.options ?? [])
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
      options,
      (newOptions) => {
        const hasExistingValue = model.value && newOptions.some((option) => option.value === model.value);

        if (hasExistingValue || newOptions.length === 0) {
          return;
        }

        model.value = newOptions[0].value;
      },
      {immediate: Number(options.value?.length) > 0},
    );
  });

  return {id, model, options};
};
