import {ref, type Ref, watch, type WritableComputedRef} from 'vue';
import {get} from '@vueuse/core';
import {booleanToTriState, triStateToBoolean} from '../utils';
import {type ToggleInputEmits, type ToggleInputModelValue, type ToggleInputProps} from '../types';
import {useElementContext} from './useElementContext';

interface ToggleInputContext {
  id: string;
  model: WritableComputedRef<ToggleInputModelValue>;
  toggleId: string;
  toggleModel: Ref<boolean>;
}

type UseToggleInputContext = (props: ToggleInputProps, emit: ToggleInputEmits) => ToggleInputContext;

export const useToggleInputContext: UseToggleInputContext = (props, emit) => {
  const toggleModel = ref<boolean>(triStateToBoolean(get(props.modelValue)));
  const {id, model} = useElementContext<ToggleInputModelValue>(props, emit);

  // When the toggle is changed, the model is updated to 1/0
  watch(toggleModel, (toggle) => {
    model.value = booleanToTriState(toggle);
  });

  // When the model is changed manually, like from another element, the toggle is updated
  watch(model, (model) => {
    toggleModel.value = triStateToBoolean(model);
  });

  return {
    id,
    model,
    toggleId: `${id}__toggle`,
    toggleModel,
  };
};
