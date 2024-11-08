import {type SelectInputEmits, type SelectInputModelValue, type SelectInputProps} from '../../types';
import {type InputWithOptionsContext, useInputWithOptionsContext} from './useInputWithOptionsContext';

export type UseSelectInputContext<
  T extends SelectInputModelValue = SelectInputModelValue,
  P extends SelectInputProps<T> = SelectInputProps<T>,
> = (props: P, emit: SelectInputEmits<T>) => InputWithOptionsContext<T, false>;

export const useSelectInputContext: UseSelectInputContext = (props, emit) => {
  return useInputWithOptionsContext(props, emit);
};
