import {computed, type ComputedRef, toValue, type WritableComputedRef} from 'vue';
import {isOfType} from '@myparcel/ts-utils';
import {createFormElement, createObjectWithKeys} from '../../utils';
import {
  type ArrayItem,
  type ElementInstance,
  type RadioGroupEmits,
  type RadioGroupModelValue,
  type RadioGroupProps,
  type SelectOption,
  type SelectOptionWithLabel,
} from '../../types';
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
    const optionValues = (toValue(context.options) ?? []).map((option) => option.value);

    return createObjectWithKeys(optionValues, (value) => {
      const option = (toValue(context.options) ?? []).find((option) => option.value === value) as SelectOption<T>;

      return createFormElement({
        ref: context.model,
        name: `${props.element.name}${value.toString()}`,
        // @ts-expect-error this works but the form builder does not technically allow it
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
