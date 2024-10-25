import {
  type SelectInputEmits,
  type SelectInputModelValue,
  type SelectInputProps,
} from '../types/component-bindings.types';
import {type InputWithOptionsContext, useInputWithOptionsContext} from './useInputWithOptionsContext';

export type UseSelectInputContext<
  T extends SelectInputModelValue = SelectInputModelValue,
  P extends SelectInputProps<T> = SelectInputProps<T>,
> = (props: P, emit: SelectInputEmits<T>) => InputWithOptionsContext<T, false>;

export const useSelectInputContext: UseSelectInputContext = (props, emit) => useInputWithOptionsContext(props, emit);
