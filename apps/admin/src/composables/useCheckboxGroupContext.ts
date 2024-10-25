import {
  type CheckboxGroupEmits,
  type CheckboxGroupModelValue,
  type CheckboxGroupProps,
} from '../types/component-bindings.types';
import {type InputWithOptionsContext, useInputWithOptionsContext} from './useInputWithOptionsContext';

export type UseCheckboxGroupContext<
  T extends CheckboxGroupModelValue = CheckboxGroupModelValue,
  P extends CheckboxGroupProps<T> = CheckboxGroupProps<T>,
> = (props: P, emit: CheckboxGroupEmits<T>) => InputWithOptionsContext<T, false>;

export const useCheckboxGroupContext: UseCheckboxGroupContext = (props, emit) =>
  useInputWithOptionsContext(props, emit);
