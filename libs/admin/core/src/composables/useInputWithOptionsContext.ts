import {computed, type ComputedRef, onMounted, type UnwrapRef, watch, type WritableComputedRef} from 'vue';
import {get, useVModel} from '@vueuse/core';
import {type ArrayItem, type SelectOptionWithLabel} from '@myparcel-pdk/admin-common';
import {toArray} from '@myparcel/ts-utils';
import {generateFieldId} from '../utils';
import {type SelectInputEmits, type SelectInputModelValue, type SelectInputProps} from '../types';
import {translateSelectOption} from '../helpers';
import {SortType} from '../data';
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
  const model = useVModel(props, undefined, emit);
  const sort = computed(() => props.element.props.sort ?? SortType.Ascending);

  const options = computed(() => {
    return (props.element.props.options ?? [])
      .map((option) => translateSelectOption(option, translate))
      .sort((a, b) => {
        if (sort.value === SortType.Descending) {
          return b.label.localeCompare(a.label);
        }

        return a.label.localeCompare(b.label);
      });
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
