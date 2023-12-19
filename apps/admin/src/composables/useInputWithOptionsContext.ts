import {computed, type ComputedRef, onMounted, type UnwrapRef, watch, type WritableComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {SortType} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {translateSelectOption} from '../utils';
import {
  type ArrayItem,
  type SelectInputEmits,
  type SelectInputModelValue,
  type SelectInputProps,
  type SelectOptionWithLabel,
} from '../types';
import {type ElementContext, useElementContext} from './useElementContext';
import {useLanguage} from './language';

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
  const {id, model} = useElementContext<T>(props, emit) as ElementContext<ModelValue<T, Multiple>>;
  const sort = computed(() => props.element.props.sort);

  const {translate} = useLanguage();

  const options = computed(() => {
    return (props.element.props.options ?? [])
      .map((option) => translateSelectOption(option, translate))
      .sort((a, b) => {
        if (b.value === -1) {
          return 1;
        }

        switch (sort.value) {
          case SortType.Ascending:
            return a.label.localeCompare(b.label);

          case SortType.Descending:
            return b.label.localeCompare(a.label);
        }

        return 0;
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

  return {id, options, model};
};
