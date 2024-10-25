import {type WritableComputedRef} from 'vue';
import {useVModel} from '@vueuse/core';
import {generateFieldId} from '../utils/forms/generateFieldId';
import {type ElementInstance, type PdkElementEmits, type PdkElementProps} from '../types/form.types';

export type ElementContext<T = unknown> = {
  id: string;
  model: WritableComputedRef<T>;
};

export const useElementContext = <
  T1 = unknown,
  T2 = T1,
  Props extends PdkElementProps<T1> = PdkElementProps<T1>,
  Emits extends PdkElementEmits<T2> = PdkElementEmits<T2>,
>(
  props: Props,
  emit: Emits,
): ElementContext<T1> => {
  const id = generateFieldId(props.element as ElementInstance);
  const model = useVModel(props, undefined, emit) as WritableComputedRef<T1>;

  return {
    id,
    model,
  };
};
