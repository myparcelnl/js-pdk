import {ComputedRef, Ref, WritableComputedRef, computed, onMounted, watch} from 'vue';
import {ElementInstance, OptionsProp} from '../types';
import {SelectOptionValue, SelectOptionWithLabel} from '@myparcel-pdk/common/src';
import {get, useVModel} from '@vueuse/core';
import {generateFieldId} from '../utils';
import {translateSelectOption} from '../helpers';
import {useLanguage} from './translations';

export type SelectInputProps<T extends SelectOptionValue = SelectOptionValue> = {
  modelValue: T;
  element: ElementInstance<OptionsProp<T>>;
};

export type UseInputWithOptionsContext<
  T extends SelectOptionValue = SelectOptionValue,
  P extends SelectInputProps<T> = SelectInputProps<T>,
  K extends keyof P = keyof P,
> = (
  props: P,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit: (e: 'update:modelValue', value: T | any) => void,
) => {
  id: string;
  model: Ref<P[K]> | WritableComputedRef<P[K]>;
  options: ComputedRef<SelectOptionWithLabel<T>[]>;
};

export const useInputWithOptionsContext: UseInputWithOptionsContext = (props, emit) => {
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

        model.value = newOptions[0].value;
      },
      {immediate: Number(get(options)?.length) > 0},
    );
  });

  return {id, options, model};
};
