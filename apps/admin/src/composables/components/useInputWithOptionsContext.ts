import {onMounted, toValue, watch, type WritableComputedRef} from 'vue';
import {toArray} from '@myparcel/ts-utils';
import {type ArrayItem, type SelectInputEmits, type SelectInputModelValue, type SelectInputProps} from '../../types';
import {type ElementOptionsContext, useElementOptions} from './useElementOptions';
import {type ElementContext, useElementContext} from './useElementContext';

type ModelValue<T extends SelectInputModelValue, Multiple extends boolean> = Multiple extends true ? T : ArrayItem<T>;

export interface InputWithOptionsContext<T extends SelectInputModelValue, Multiple extends boolean>
  extends ElementOptionsContext<T> {
  id: string;
  model: WritableComputedRef<ModelValue<T, Multiple>>;
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
  const {options} = useElementOptions<T>(props);

  onMounted(() => {
    watch(
      options,
      (newOptions) => {
        const values = toArray(toValue(model));
        const hasExistingValue =
          values.length && newOptions.some((option) => values.includes(option.value as ModelValue<T, Multiple>));

        if (hasExistingValue || newOptions.length === 0) {
          return;
        }

        model.value = (multiple ? [newOptions[0].value] : newOptions[0].value) as ModelValue<T, Multiple>;
      },
      {immediate: Number(toValue(options)?.length) > 0},
    );
  });

  return {id, options, model};
};
