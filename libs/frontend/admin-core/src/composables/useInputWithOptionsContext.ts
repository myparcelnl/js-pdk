import {type ComputedRef, type Ref, type WritableComputedRef, computed, onMounted, watch} from 'vue';
import {get, useVModel} from '@vueuse/core';
import {type SelectOptionValue, type SelectOptionWithLabel} from '@myparcel-pdk/common';
import {type OneOrMore} from '@myparcel/ts-utils';
import {generateFieldId} from '../utils';
import {type ArrayItem, type OptionsProp, type PdkElementEmits, type PdkElementProps} from '../types';
import {translateSelectOption} from '../helpers';
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

  const options = computed(() => {
    return (props.element.props.options ?? []).map((option) => translateSelectOption(option, translate));
  });

  onMounted(() => {
    watch(
      options,
      (newOptions) => {
        const hasExistingValue = get(model) && newOptions.some((option) => option.value === get(model));

        if (hasExistingValue || newOptions.length === 0) {
          return;
        }

        const multipleValues: SelectOptionValue[] = [];

        newOptions.forEach((option) => {
          if (typeof get(model) === 'object' && get(model).includes(option.value)) {
            multipleValues.push(option.value);
          }
        });

        model.value = multiple ? multipleValues : newOptions[0].value;
      },
      {immediate: Number(get(options)?.length) > 0},
    );
  });

  return {id, options, model};
};
