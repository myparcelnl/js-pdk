import {type UseInputWithOptionsContext, useInputWithOptionsContext} from './useInputWithOptionsContext';

export const useSelectInputContext: UseInputWithOptionsContext = (props, emit, multiple = false) =>
  useInputWithOptionsContext(props, emit, multiple);
