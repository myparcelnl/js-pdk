import {computed, type ComputedRef, onMounted, type Ref, watch, type WritableComputedRef} from 'vue';
import {get, useVModel} from '@vueuse/core';
import {type SelectOptionValue, type SelectOptionWithLabel} from '@myparcel-pdk/admin-common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {generateFieldId} from '../utils';
import {type ArrayItem, type OptionsProp, type PdkElementEmits, type PdkElementProps} from '../types';
import {translateSelectOption} from '../helpers';
import {SortType} from '../data';
import {useLanguage} from './useLanguage';

export type SelectInputProps<T extends OneOrMore<SelectOptionValue> = OneOrMore<SelectOptionValue>> = PdkElementProps<
  T,
  OptionsProp<ArrayItem<T>>
>;

export type UseInputWithOptionsContext<
  K extends SelectOptionValue = SelectOptionValue,
  T extends OneOrMore<K> = OneOrMore<K>,
  P extends SelectInputProps<T> = SelectInputProps<T>,
> = (
  props: P,
  emit: PdkElementEmits<T>,
  multiple?: boolean,
) => {
  id: string;
  model: T extends unknown[] ? Ref<T> | WritableComputedRef<T> : Ref<K> | WritableComputedRef<K>;
  options: ComputedRef<SelectOptionWithLabel<K>[]>;
};

// @ts-expect-error todo
export const useInputWithOptionsContext: UseInputWithOptionsContext = (props, emit, multiple = false) => {
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
        const hasExistingValue = values.length && newOptions.some((option) => values.includes(option.value));

        if (hasExistingValue || newOptions.length === 0) {
          return;
        }

        model.value = multiple ? [newOptions[0].value] : newOptions[0].value;
      },
      {immediate: Number(get(options)?.length) > 0},
    );
  });

  return {id, options, model};
};
