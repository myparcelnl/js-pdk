import {computed, type ComputedRef, onMounted, type UnwrapRef, watch, type WritableComputedRef} from 'vue';
import {get, useVModel} from '@vueuse/core';
import {type ArrayItem, type SelectOptionWithLabel} from '@myparcel-pdk/admin-common';
import {toArray} from '@myparcel/ts-utils';
import {generateFieldId} from '../utils';
import {type SelectInputEmits, type SelectInputModelValue, type SelectInputProps} from '../types';
import {translateSelectOption} from '../helpers';
import {useLanguage} from './useLanguage';

type ModelValue<T extends SelectInputModelValue, Multiple extends boolean> = Multiple extends true ? T : ArrayItem<T>;

export interface InputWithOptionsContext<T extends SelectInputModelValue, Multiple extends boolean> {
  id: string;
  model: WritableComputedRef<ModelValue<T, Multiple>>;
  options: ComputedRef<SelectOptionWithLabel<UnwrapRef<T>>[]>;
}

export const useInputWithOptionsContext = <
  T extends SelectInputModelValue = SelectInputModelValue,
  Props extends SelectInputProps<T> = SelectInputProps<T>,
  Multiple extends boolean = boolean,
>(
  props: Props,
  emit: SelectInputEmits<T>,
  multiple?: Multiple,
): InputWithOptionsContext<T, Multiple> => {
  const {translate} = useLanguage();

  const id = generateFieldId(props.element);
  const model = useVModel(props, undefined, emit) as WritableComputedRef<ModelValue<T, Multiple>>;

  const options = computed(() => {
    return (get(props.element).props.options ?? []).map((option) => translateSelectOption(option, translate));
  });

  onMounted(() => {
    watch(
      options,
      (newOptions) => {
        const values = toArray(get(model));
        const hasExistingValue =
          values.length && newOptions.some((option) => values.includes(option.value as ModelValue<T, Multiple>));

        if (hasExistingValue || newOptions.length === 0) {
          return;
        }

        model.value = (multiple ? [newOptions[0].value] : newOptions[0].value) as ModelValue<T, Multiple>;
      },
      {immediate: Number(get(options)?.length) > 0},
    );
  });

  // @ts-expect-error todo
  return {id, options, model};
};
