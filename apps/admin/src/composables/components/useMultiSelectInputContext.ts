import {type MultiSelectInputEmits, type MultiSelectInputModelValue, type MultiSelectInputProps} from '../../types';
import {type InputWithOptionsContext, useInputWithOptionsContext} from './useInputWithOptionsContext';

export type UseMultiSelectInputContext<
  T extends MultiSelectInputModelValue = MultiSelectInputModelValue,
  P extends MultiSelectInputProps<T> = MultiSelectInputProps<T>,
> = (props: P, emit: MultiSelectInputEmits<T>) => InputWithOptionsContext<T[number], true>;

export const useMultiSelectInputContext: UseMultiSelectInputContext = (props, emit) => {
  return useInputWithOptionsContext(props, emit, true);
};
