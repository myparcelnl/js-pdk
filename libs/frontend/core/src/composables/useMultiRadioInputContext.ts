import {AdminIcon, ElementInstance} from '../types';
import {ComputedRef, Ref, WritableComputedRef, computed} from 'vue';
import {Keyable, SelectOption, SelectOptionValue, SelectOptionWithLabel} from '@myparcel-pdk/common/src';
import {createFormElement, createObjectWithKeys} from '../utils';
import {UseInputWithOptionsContext} from './useInputWithOptionsContext';
import {get} from '@vueuse/core';
import {useSelectInputContext} from './useSelectInputContext';

export type MultiRadioInputProps<T extends SelectOptionValue = SelectOptionValue> = {
  modelValue: T;
  element: ElementInstance<{
    options?: (SelectOption<T> & {icon?: AdminIcon})[];
  }>;
};

type UseMultiRadioInputContext<
  T extends Keyable = Keyable,
  P extends MultiRadioInputProps<T> = MultiRadioInputProps<T>,
  K extends keyof P = keyof P,
> = (
  props: P,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit: (e: 'update:modelValue', value: T | any) => void,
  sortOptions?: boolean,
) => {
  id: string;
  model: Ref<P[K]> | WritableComputedRef<P[K]>;
  options: ComputedRef<SelectOptionWithLabel<T>[]>;
  elements: ComputedRef<Record<T, ElementInstance>>;
};

export const useMultiRadioInputContext: UseMultiRadioInputContext = (props, emit, sortOptions) => {
  const selectInputContext = useSelectInputContext(props, emit, sortOptions) as ReturnType<
    UseInputWithOptionsContext<Keyable>
  >;

  const elements = computed(() => {
    const optionValues = (get(selectInputContext.options) ?? []).map((option) => option.value);

    return createObjectWithKeys(optionValues, (value) => {
      const option = (get(selectInputContext.options) ?? []).find((option) => option.value === value);

      return createFormElement({
        ref: selectInputContext.model,
        name: `${props.element.name}${value.toString()}`,
        label: option?.label,
        props: {value},
      });
    });
  });

  return {
    ...selectInputContext,
    elements,
  };
};
