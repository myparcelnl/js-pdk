import {computed, type ComputedRef, type Ref, type WritableComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {
  type Keyable,
  type SelectOption,
  type SelectOptionValue,
  type SelectOptionWithLabel,
} from '@myparcel-pdk/common';
import {isOfType} from '@myparcel/ts-utils';
import {createFormElement, createObjectWithKeys} from '../utils';
import {type AdminIcon, type ElementInstance, type RadioGroupOption} from '../types';
import {useSelectInputContext} from './useSelectInputContext';
import {type UseInputWithOptionsContext} from './useInputWithOptionsContext';

export type RadioGroupProps<T extends SelectOptionValue = SelectOptionValue> = {
  modelValue: T;
  element: ElementInstance<{
    options?: (SelectOption<T> & {icon?: AdminIcon})[];
  }>;
};

type UseRadioGroupContext<
  T extends Keyable = Keyable,
  P extends RadioGroupProps<T> = RadioGroupProps<T>,
  K extends keyof P = keyof P,
> = (
  props: P,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  emit: (e: 'update:modelValue', value: T | any) => void,
) => {
  id: string;
  model: Ref<P[K]> | WritableComputedRef<P[K]>;
  options: ComputedRef<RadioGroupOption<T>[]>;
  elements: ComputedRef<Record<T, ElementInstance>>;
};

// @ts-expect-error todo
export const useRadioGroupContext: UseRadioGroupContext = (props, emit) => {
  const selectInputContext = useSelectInputContext(props, emit) as ReturnType<UseInputWithOptionsContext<Keyable>>;

  const elements = computed(() => {
    const optionValues = (get(selectInputContext.options) ?? []).map((option) => option.value);

    return createObjectWithKeys(optionValues, (value) => {
      const option = (get(selectInputContext.options) ?? []).find(
        (option) => option.value === value,
      ) as RadioGroupOption;

      return createFormElement({
        ref: selectInputContext.model,
        name: `${props.element.name}${value.toString()}`,
        label: isOfType<SelectOptionWithLabel>(option, 'label') ? option.label : option.plainLabel,
        props: {
          value: option.value,
          image: option.image,
          icon: option.icon,
        },
      });
    });
  });

  return {
    ...selectInputContext,
    elements,
  };
};
