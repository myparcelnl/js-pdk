import {computed, type ComputedRef, type WritableComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {type SelectOption, type SelectOptionWithLabel} from '@myparcel-pdk/admin-common';
import {isOfType} from '@myparcel/ts-utils';
import {createFormElement, createObjectWithKeys} from '../utils';
import {
  type ArrayItem,
  type ElementInstance,
  type RadioGroupEmits,
  type RadioGroupModelValue,
  type RadioGroupProps,
} from '../types';
import {useInputWithOptionsContext} from './useInputWithOptionsContext';

interface RadioGroupContext<T extends RadioGroupModelValue> {
  id: string;
  model: WritableComputedRef<ArrayItem<T>>;
  options: ComputedRef<SelectOption<T>[]>;
  elements: ComputedRef<Record<ArrayItem<T>, ElementInstance>>;
}

export const useRadioGroupContext = <
  T extends RadioGroupModelValue = RadioGroupModelValue,
  Props extends RadioGroupProps<T> = RadioGroupProps<T>,
>(
  props: Props,
  emit: RadioGroupEmits<T>,
): RadioGroupContext<T> => {
  const context = useInputWithOptionsContext<T, Props>(props, emit);

  const elements = computed(() => {
    const optionValues = (get(context.options) ?? []).map((option) => option.value);

    return createObjectWithKeys(optionValues, (value) => {
      const option = (get(context.options) ?? []).find((option) => option.value === value) as SelectOption<T>;

      return createFormElement({
        ref: context.model,
        name: `${props.element.name}${value.toString()}`,
        label: isOfType<SelectOptionWithLabel<T>>(option, 'label') ? option.label : option.plainLabel,
        props: {
          value: option.value,
          image: option.image,
          icon: option.icon,
        },
      });
    });
  });

  return {
    ...context,
    // @ts-expect-error todo
    elements,
  };
};
